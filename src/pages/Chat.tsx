import Background from '@components/common/Background'
import ChatPanel from '@components/chat/ChatPanel';
import RoomSelectBar from '@components/chat/RoomSelectPanel';
import { useEffect, useState } from 'react';
import { Room } from 'types';
import ClientList from '@components/chat/ClientPanel';
import BlankRoom from '@components/chat/BlankRoom';
import Navbar from '@components/common/Navbar';
import Footer from '@components/common/Footer';

const Chat = () => {
    const [currentRoom, setCurrentRoom] = useState<Room | null>(null);

    useEffect(() => {
        // TODO fetch chat history
    }, [currentRoom]);

    return (
        <Background>
            <div className='grid grid-cols-4 gap-x-8 gap-y-4 m-32'>
                <Navbar />
                <RoomSelectBar setCurrentRoom={setCurrentRoom} />
                {
                    currentRoom ? <ChatPanel room={currentRoom} /> : <BlankRoom />
                }
                <ClientList setCurrentRoom={setCurrentRoom} />
                <Footer />
            </div>
        </Background>
    );
};

export default Chat;