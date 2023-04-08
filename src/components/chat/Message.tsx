const mockImg = "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80";

interface IMessage {
    author: string;
    text: string;
    isOwner: boolean;
}

const Message = (props: IMessage) => {
    const { author, text, isOwner } = props;

    return (
        <div className={`flex flex-col ${isOwner ? "self-end" : ""}`}>
            <header className={`flex gap-2 items-center ${isOwner ? "flex-row-reverse" : ""}`}>
                <img
                    className="ml-2 inline-block h-6 w-6 rounded-full ring-2 ring-white"
                    src={mockImg}
                    alt="Image Description"
                />
                <p className="text-base">{author}</p>
            </header>
            <main className={`mt-2 bg-slate-200 py-3 px-4 rounded w-fit ${isOwner ? "bg-blue-600 text-slate-100" : ""}`}>
                <p className="text-md">{text}</p>
            </main>
        </div >
    )
}
export default Message;