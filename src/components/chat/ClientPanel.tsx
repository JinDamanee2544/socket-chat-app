import { useState } from "react";
import { IRoom, IUser } from "types";
import { FaUserAlt } from 'react-icons/fa'

interface IClientList {
    setCurrentRoom: (room: IRoom) => void;
}

const ClientList = (props: IClientList) => {
    const { setCurrentRoom } = props;
    const [clients, setClients] = useState<IUser[]>([]);
    const openRoom = (user: IUser) => {
        // todo: open room
        // todo: set current room
    }

    return (
        <nav className='bg-slate-100 col-span-1 min-h-[720px] p-4 flex flex-col gap-4 rounded shadow-xl'>
            <h1 className="text-xl text-slate-600">All Clients</h1>
            {
                clients.map(user => {
                    return (
                        <button key={user.id} className="flex gap-2 border-1 border-black"
                            onClick={() => openRoom(user)}
                        >
                            <FaUserAlt size={24} />
                            <h1>{user.username}</h1>
                        </button>
                    )
                })
            }
        </nav>
    )
}
export default ClientList;