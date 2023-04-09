import type { Message as MesageType, Room } from 'types';
import Message from '@components/chat/Message'

const currentUser = 'John Doe'

const mockMessages: MesageType = {
    id: 1,
    author: currentUser,
    text: 'Hello World',
}

const messages = [
    mockMessages,
    {
        ...mockMessages,
        id: 2,
        author: 'Jane Doe',
    }, mockMessages, mockMessages
]

interface IChatRoom {
    room: Room;
}

const ChatRoom = (props: IChatRoom) => {
    const { room } = props;
    return (
        <main className="flex-grow bg-slate-100 min-w-[300px] max-w-lg rounded m-4 min-h-[80%] flex flex-col gap-2">
            <h1 className="text-2xl font-bold text-slate-100 bg-blue-600 py-3 px-4 rounded-t text-right">{room.name}</h1>
            <div className='flex flex-col p-6 gap-4 flex-grow overflow-x-auto h-10'>
                {
                    messages.map((message) => {
                        return (
                            <Message
                                key={message.id}
                                text={message.text}
                                author={message.author}
                                isOwner={currentUser === message.author}
                            />
                        )
                    })
                }
            </div>
            <div className='p-6 flex gap-2'>
                <input type="text" className="py-3 px-4 block w-full border-slate-400 rounded-md text-sm focus:border-blue-600 focus:ring-blue-600 " />
                <button type="button" className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-600 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800">
                    Send
                </button>
            </div>
        </main>
    )
}

export default ChatRoom

export const BlankRoom = () => {
    return (
        <main className="flex-grow justify-center items-center bg-slate-100 min-w-[300px] max-w-lg rounded m-4 min-h-[80%] flex flex-col gap-2">
            Please select a room
        </main>
    )
}
