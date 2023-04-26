import type { IMessage as MesageType, IRoom, IMessage } from 'types';
import Message from '@components/chat/Message'
import { IoMdExit } from 'react-icons/io'
import { useEffect, useRef, useState } from 'react';
import { FaUserAlt } from 'react-icons/fa'
import { useAuth } from 'context/auth';
import { useWebSocket } from 'context/ws';
import apiClient from 'utils/apiClient';
import { toast } from 'react-toastify';
import { useRoom } from 'context/room';

interface IChatRoom {
    currentRoom: IRoom;
    setCurrentRoom: (room: IRoom | null) => void;
}

const ChatRoom = (props: IChatRoom) => {
    const { currentRoom, setCurrentRoom } = props

    const { updateRoom } = useRoom();
    const { user } = useAuth();
    const { conn } = useWebSocket();
    const [messageList, setMessageList] = useState<MesageType[]>([]);
    const inputRef = useRef<HTMLInputElement>(null);

    const leaveRoom = () => {
        const respLoading = apiClient.get(`/ws/leaveRoom/${currentRoom.id}`, {
            headers: {
                Authorization: `Bearer ${user.accessToken}`
            }
        })
        respLoading.then(() => {
            toast.success('Leave room successfully')
            setCurrentRoom(null)
            updateRoom(user)
        }).catch(() => {
            toast.error('Leave room failed')
        })
    }

    const handleSendMessage = (e: React.SyntheticEvent) => {
        e.preventDefault()
        const text = inputRef.current?.value;
        if (!text) return;
        if (!conn) return;
        conn.send(text)
        inputRef.current.value = '';
    }

    useEffect(() => {
        if (!conn) return;
        conn.onmessage = (message) => {

            const m: IMessage = JSON.parse(message.data)
            console.log(m);

            if (m.content === 'A new user has joined the room') {
                setMessageList([...messageList, {
                    ...m,
                    isAnnouncement: true
                }])
                return;
            }

            // create regex to match user: {} left the chat
            const regex = /user: (.*) left the chat/

            if (regex.test(m.content)) {
                setMessageList([...messageList, {
                    ...m,
                    isAnnouncement: true
                }])
                return;
            }
            setMessageList([...messageList, m])
        }

        conn.onopen = () => {
            console.log('connected')
        }
        conn.onclose = () => {
            console.log('disconnected')
        }
        conn.onerror = (e) => {
            console.log('error', e)
        }
    }, [messageList])

    return (
        <main className="flex-grow bg-slate-100 col-span-2 rounded min-h-[720px] flex flex-col gap-2 shadow-xl">
            <header className='text-slate-100 bg-blue-600 py-3 px-4 rounded-t flex justify-between items-center'>
                <div className='flex gap-8 items-center'>
                    <h1 className="text-2xl font-bold">{currentRoom.name}</h1>
                    <span className='flex gap-2'>
                        <FaUserAlt />
                        <h1 className='text-sm text-slate-200'>1/{currentRoom.clients?.length || 0} Online</h1>
                    </span>
                </div>
                {
                    // public room can leave
                    currentRoom.category === 'public' ? (
                        <button
                            className="inline-flex flex-shrink-0 justify-center items-center gap-2 h-8 w-8 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm "
                            onClick={leaveRoom}
                        >
                            <IoMdExit size={24} />
                        </button>
                    ) : null
                }

            </header>
            <div className='flex flex-col p-6 gap-4 flex-grow overflow-x-auto h-10'>
                {
                    messageList.map((message, id) => {
                        return (
                            <Message
                                key={id}
                                text={message.content}
                                username={message.username}
                                isOwner={user.id === message.senderId}
                                isAnnouncement={message.isAnnouncement}
                            />
                        )
                    })
                }
            </div>
            <form className='p-6 flex gap-2'>
                <input
                    ref={inputRef}
                    type="text"
                    className="py-3 px-4 block w-full border-slate-400 rounded-md text-sm focus:border-blue-600 focus:ring-blue-600 "
                />
                <button
                    type="submit"
                    className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-600 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 transition-all text-sm "
                    onClick={handleSendMessage}
                >
                    Send
                </button>
            </form>
        </main>
    )
}

export default ChatRoom