import Background from '@components/common/Background'
import ChatPanel from '@components/chat/ChatPanel';
import RoomSelectBar from '@components/chat/RoomSelectPanel';
import { useEffect, useState } from 'react';
import { Room } from 'types';
import ClientList from '@components/chat/ClientPanel';
import BlankRoom from '@components/chat/BlankRoom';

const Chat = () => {
    const [currentRoom, setCurrentRoom] = useState<Room | null>(null);

    useEffect(() => {
        console.log(currentRoom);
        // TODO fetch chat history
    }, [currentRoom]);

    return (
        <Background>
            <RoomSelectBar setCurrentRoom={setCurrentRoom} />
            {
                currentRoom ? <ChatPanel room={currentRoom} /> : <BlankRoom />
            }
            <ClientList setCurrentRoom={setCurrentRoom} />
        </Background>
    );
};

export default Chat;