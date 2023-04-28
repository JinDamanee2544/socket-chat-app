import { IRoom, IUser } from "types";
import { FaUserAlt } from 'react-icons/fa'
import apiClient from "utils/apiClient";
import { useAuth } from "context/auth";
import { toast } from 'react-toastify'
import { useRoom } from "context/room";
import { useClient } from "context/client";

interface IClientList {
    openRoom: (room: IRoom) => void;
}

const ClientList = (props: IClientList) => {
    const { openRoom } = props;

    const { user } = useAuth();
    const { room } = useRoom();
    const { client } = useClient();

    const createDM = (toUser: IUser) => {
        if (room.find(
            r => r.name === `${user.username} to ${toUser.username}` ||
                r.name === `${toUser.username} to ${user.username}`)) {
            toast.error('Room already opened')
            return;
        }
        const respLoading = apiClient.post('ws/createDM', {
            room_name: `${user.username} to ${toUser.username}`,
            partner_id: toUser.id
        }, {
            headers: {
                Authorization: `Bearer ${user.accessToken}`
            }
        })

        respLoading.then(resp => {
            const room: IRoom = resp.data;
            openRoom(room);
        }).catch(err => {
            console.log(err)
            toast.error('Failed to open room')
        })
    }

    return (
        <nav className='bg-slate-100 col-span-1 min-h-[720px] p-4 flex flex-col gap-2 rounded shadow-xl'>
            <h1 className="text-xl text-slate-600">All Clients</h1>
            {
                client.map(c => {
                    return (
                        <button
                            key={c.id}
                            className={`flex gap-1 px-2 py-3 duration-200 rounded ${c.id !== user.id ? "hover:bg-slate-200" : ""}`}
                            disabled={c.id === user.id}
                            onClick={() => createDM(c)}
                        >
                            <FaUserAlt size={24} />
                            <h1>{c.username} {c.id === user.id ? "(Me)" : ""}</h1>
                        </button>
                    )
                })
            }
        </nav>
    )
}
export default ClientList;