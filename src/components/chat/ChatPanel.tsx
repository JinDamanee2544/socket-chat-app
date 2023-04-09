import type { Message as MesageType, Room, User } from 'types';
import Message from '@components/chat/Message'
import { IoMdExit } from 'react-icons/io'
import { useRef, useState } from 'react';
import { FaUserAlt } from 'react-icons/fa'

const currentUser: User = {
    id: 1,
    name: 'John Doe',
    image: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80'
}

const mockMessagesList: MesageType[] = [
    {
        id: 1,
        text: 'Hello World',
        author: currentUser
    },
    {
        id: 2,
        text: 'Hello World',
        author: {
            id: 2,
            name: 'Jane Doe',
            image: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80'
        }
    }
]

interface IChatRoom {
    room: Room;
}

const ChatRoom = (props: IChatRoom) => {
    const { room } = props;
    const [messages, setMessages] = useState<MesageType[]>(mockMessagesList);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleSendMessage = (e: React.SyntheticEvent) => {
        e.preventDefault()
        const text = inputRef.current?.value;
        if (!text) return;

        const newMessage: MesageType = {
            id: messages.length + 1,
            text: text,
            author: currentUser
        }
        setMessages([
            ...messages,
            newMessage
        ])
    }

    return (
        <main className="flex-grow bg-slate-100 col-span-2 rounded min-h-[720px] flex flex-col gap-2 shadow-xl">
            <header className='text-slate-100 bg-blue-600 py-3 px-4 rounded-t flex justify-between items-center'>
                <div className='flex gap-8 items-center'>
                    <h1 className="text-2xl font-bold">{room.name}</h1>
                    <span className='flex gap-2'>
                        <FaUserAlt />
                        <h1 className='text-sm text-slate-200'>1/2 Online</h1>
                    </span>
                </div>
                <button className="inline-flex flex-shrink-0 justify-center items-center gap-2 h-8 w-8 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm "><IoMdExit size={24} /></button>
            </header>
            <div className='flex flex-col p-6 gap-4 flex-grow overflow-x-auto h-10'>
                {
                    messages.map((message) => {
                        return (
                            <Message
                                key={message.id}
                                text={message.text}
                                author={message.author}
                                isOwner={currentUser.id === message.author.id}
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