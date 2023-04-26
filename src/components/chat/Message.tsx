import { FaUserCircle } from 'react-icons/fa'

interface IMessage {
    username: string;
    text: string;
    isOwner: boolean;
    isAnnouncement?: boolean;
}

const Message = (props: IMessage) => {
    const { username, text, isOwner, isAnnouncement } = props;

    if (isAnnouncement) {
        return (
            <p className="text-center text-slate-600">{text}</p>
        )
    }

    return (
        <div className={`flex flex-col ${isOwner ? "items-end" : ""}`}>
            <header className={`flex gap-2 items-center ${isOwner ? "flex-row-reverse" : ""}`}>
                <FaUserCircle size={24} />
                <p className="text-base text-slate-600">{username}</p>
            </header>
            <main className={`mt-2 py-3 px-4 rounded w-fit flex ${isOwner ? "bg-blue-600" : "bg-slate-200"}`}>
                <p className={`text-md text-right  ${isOwner ? "text-slate-100" : "text-slate-600"}`}>{text}</p>
            </main>
        </div >
    )
}
export default Message;