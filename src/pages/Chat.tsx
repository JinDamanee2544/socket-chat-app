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
import apiClient from 'utils/apiClient';
import { toast } from 'react-toastify';


const Chat = () => {
    const { setConn } = useWebSocket()
    const { user } = useAuth();
    const { updateRoom } = useRoom();
    const { updateClient } = useClient();
    const [currentRoomId, setCurrentRoomId] = useState<number | null>(null);

    const openRoom = (room: IRoom) => {
        const ws = new WebSocket(`ws://localhost:8080/ws/joinRoom/${room.id}`, user.accessToken);
        console.log(ws);
        setConn(ws)
        updateRoom(user)
        setCurrentRoomId(room.id)
    }

    const leaveRoom = () => {
        const respLoading = apiClient.get(`/ws/leaveRoom/${currentRoomId}`, {
            headers: {
                Authorization: `Bearer ${user.accessToken}`
            }
        })
        respLoading.then(() => {
            console.log('leave room success');
            toast.success('Leave room successfully')
            setCurrentRoomId(null)
            updateRoom(user)
        }).catch(() => {
            toast.error('Leave room failed')
        })
    }

    useEffect(() => {
        updateRoom(user)
        updateClient(user)
    }, [])

    return (
        <Background>
            <div className='grid grid-cols-4 gap-x-8 gap-y-4 m-32'>
                <Navbar leaveRoom={leaveRoom} />
                <RoomSelectBar openRoom={openRoom} />
                {
                    currentRoomId ? <ChatPanel
                        currentRoomId={currentRoomId}
                        leaveRoom={leaveRoom}
                    /> :
                        <BlankRoom />
                }
                <ClientList openRoom={openRoom} />
                <Footer />
            </div>
        </Background>
    );
};

export default Chat;
