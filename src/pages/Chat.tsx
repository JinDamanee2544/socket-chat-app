import Background from '@components/common/Background'
import ChatPanel from '@components/chat/ChatPanel';
import RoomSelectBar from '@components/chat/RoomPanel';
import { useEffect, useState } from 'react';
import { IRoom } from 'types';
import ClientList from '@components/chat/ClientPanel';
import BlankRoom from '@components/chat/BlankRoom';
import Navbar from '@components/common/Navbar';
import Footer from '@components/common/Footer';
import { useWebSocket } from 'context/ws';
import { useAuth } from 'context/auth';
import { useRoom } from 'context/room';
import { useClient } from 'context/client';


const Chat = () => {
    const { setConn } = useWebSocket()
    const { user } = useAuth();
    const { updateRoom } = useRoom();
    const { updateClient } = useClient();
    const [currentRoom, setCurrentRoom] = useState<IRoom | null>(null);

    const openRoom = (room: IRoom) => {
        const ws = new WebSocket(`ws://localhost:8080/ws/joinRoom/${room.id}`, user.accessToken);
        setConn(ws)
        setCurrentRoom(room);
    }

    useEffect(() => {
        updateRoom(user)
        updateClient(user)
    }, [])

    return (
        <Background>
            <div className='grid grid-cols-4 gap-x-8 gap-y-4 m-32'>
                <Navbar />
                <RoomSelectBar openRoom={openRoom} />
                {
                    currentRoom ? <ChatPanel currentRoom={currentRoom} /> : <BlankRoom />
                }
                <ClientList openRoom={openRoom} />
                <Footer />
            </div>
        </Background>
    );
};

export default Chat;
