import type { IMessage as MesageType, IMessage, IUser } from 'types';
import Message from '@components/chat/Message'
import { IoMdExit } from 'react-icons/io'
import { useEffect, useRef, useState } from 'react';
import { FaUserAlt } from 'react-icons/fa'
import { useAuth } from 'context/auth';
import { useWebSocket } from 'context/ws';
import { useRoom } from 'context/room';
import { useClient } from 'context/client';

interface IChatRoom {
    currentRoomId: number;
    leaveRoom: () => void;
}

const regexJoin = /(.*) has joined the room/
const regexExit = /(.*) left the room/


const ChatRoom = (props: IChatRoom) => {
    const { currentRoomId, leaveRoom } = props

    const { updateRoom } = useRoom();
    const { getParticipants } = useClient()
    const { room, getRoom } = useRoom();
    const { user } = useAuth();
    const { conn } = useWebSocket();
    const inputRef = useRef<HTMLInputElement>(null);
    const [messageList, setMessageList] = useState<MesageType[]>([]);
    const [participants, setParticipants] = useState<IUser[]>([])
    const currRoom = getRoom(currentRoomId) // easy refresh

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
            if (regexJoin.test(m.content)) {
                setMessageList([...messageList, {
                    ...m,
                    isAnnouncement: true
                }])
                updateRoom(user)
                return;
            }
            if (regexExit.test(m.content)) {
                setMessageList([...messageList, {
                    ...m,
                    isAnnouncement: true
                }])
                updateRoom(user)
                return;
            }
            setMessageList([...messageList, m])
        }

        conn.onopen = () => {
            setMessageList([])
            console.log('connected')
        }
        conn.onclose = () => {
            setMessageList([])
            console.log('disconnected')
        }
        conn.onerror = (e) => {
            console.log('error', e)
        }
    }, [messageList, conn])

    // update online status
    useEffect(() => {
        if (currRoom) {
            const res = getParticipants(currRoom.clients!)
            setParticipants(res)
        }
    }, [room])

    return (
        <main className="flex-grow bg-slate-100 col-span-2 rounded min-h-[720px] flex flex-col gap-2 shadow-xl">
            <header className='text-slate-100 drop-shadow-lg bg-blue-600 py-3 px-4 rounded-t flex justify-between items-center'>
                <div className='flex gap-8 items-center'>
                    <h1 className="text-2xl font-bold">{currRoom?.name || undefined}</h1>
                    <span className='group flex gap-2 relative'>
                        <FaUserAlt />
                        <h1 className='text-sm text-slate-200'>{currRoom?.clients.length || 0} Online</h1>
                        {
                            participants.length !== 0 && <div
                                className="opacity-0 duration-200 group-hover:opacity-100 absolute z-10 top-5 left-4 bg-gray-dark bg-slate-600 text-slate-200 rounded px-2 py-1 text-sm whitespace-nowrap">
                                {
                                    participants.map((p, id) => {
                                        return (
                                            <div key={id} className='flex gap-2 items-center'>
                                                <FaUserAlt />
                                                <h1>{p.username}</h1>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        }
                    </span>
                </div>
                {
                    // public room can leave
                    currRoom?.category === 'public' ? (
                        <button
                            className="inline-flex flex-shrink-0 justify-center items-center gap-2 h-8 w-8 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm "
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
                    className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-600 text-white hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 transition-all text-sm "
                    onClick={handleSendMessage}
                >
                    Send
                </button>
            </form>
        </main>
    )
}

export default ChatRoom