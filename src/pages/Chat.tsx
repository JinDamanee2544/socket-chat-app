import Background from '@components/common/Background'
import ChatPanel, { BlankRoom } from '@components/chat/ChatPanel';
import RoomSelectBar from '@components/chat/RoomSelectBar';
import { useState } from 'react';
import { Room } from 'types';
import ClientList from '@components/chat/ClientPanel';

const Chat = () => {

    const [currentRoom, setCurrentRoom] = useState<Room | null>(null);

    return (
        <Background>
            <RoomSelectBar setCurrentRoom={setCurrentRoom} />
            {
                currentRoom ? <ChatPanel room={currentRoom} /> : <BlankRoom />
            }
            <ClientList />
        </Background>
    );
};

export default Chat;