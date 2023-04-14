import { IUser } from "types";

interface IMessage {
    author: IUser;
    text: string;
    isOwner: boolean;
}

const Message = (props: IMessage) => {
    const { author, text, isOwner } = props;

    return (
        <div className={`flex flex-col ${isOwner ? "items-end" : ""}`}>
            <header className={`flex gap-2 items-center ${isOwner ? "flex-row-reverse" : ""}`}>
                <img
                    className="ml-2 inline-block h-6 w-6 rounded-full ring-white"
                    src={author.image}
                    alt="Image Description"
                />
                <p className="text-base text-slate-600">{author.name}</p>
            </header>
            <main className={`mt-2 py-3 px-4 rounded w-fit flex ${isOwner ? "bg-blue-600" : "bg-slate-200"}`}>
                <p className={`text-md text-right  ${isOwner ? "text-slate-100" : "text-slate-600"}`}>{text}</p>
            </main>
        </div >
    )
}
export default Message;