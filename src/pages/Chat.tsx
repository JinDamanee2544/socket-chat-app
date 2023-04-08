import Background from '@components/common/Background'
import type { Message as MesageType } from 'types';
import Message from '@components/chat/Message'

const mockMessages: MesageType = {
    id: 1,
    author: 'John Doe',
    text: 'Hello World',
}

const currentUser = 'John Doe'

const messages = [
    mockMessages,
    {
        ...mockMessages,
        id: 2,
        author: 'Jane Doe',
    }, mockMessages, mockMessages
]

const Chat = () => {
    return (
        <Background>
            <nav className='bg-slate-100 min-w-[200px] min-h-[80%] m-4 p-4'>

            </nav>
            <main className="flex-grow bg-slate-100 min-w-[300px] max-w-lg rounded m-4 min-h-[80%] flex flex-col gap-2">
                <h1 className="text-2xl font-bold text-slate-100 bg-blue-600 py-3 px-4 rounded-t text-right">Room 1</h1>
                <div className='flex flex-col p-6 gap-4 flex-grow overflow-x-auto h-10'>
                    {
                        messages.map((message) => {
                            return <Message
                                key={message.id}
                                text={message.text}
                                author={message.author}
                                isOwner={currentUser === message.author}
                            />
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
        </Background>
    );
};

export default Chat;
