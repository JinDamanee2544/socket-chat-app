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
    }
]

const Chat = () => {
    return (
        <Background>
            <nav className='bg-slate-100 min-w-[200px] min-h-[80%] m-4 p-4'>

            </nav>
            <main className="flex-grow bg-slate-100 min-w-[300px] max-w-lg rounded m-4 min-h-[80%] flex flex-col gap-2">
                <h1 className="text-2xl font-bold text-slate-100 bg-blue-600 p-4 rounded-t text-right">Room 1</h1>
                <div className='flex flex-col p-6'>
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
            </main>
        </Background>
    );
};

export default Chat;
