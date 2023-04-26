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
    const { room, updateRoom } = useRoom();
    const { client } = useClient();

    const createDM = (toUser: IUser) => {
        if (room.find(
            r => r.name === `${user.username} - ${toUser.username}` ||
                r.name === `${toUser.username} - ${user.username}`)) {
            toast.error('Room already opened')
            return;
        }
        const respLoading = apiClient.post('ws/createRoom', {
            name: `${user.username} to ${toUser.username}`,
            category: "private"
        }, {
            headers: {
                Authorization: `Bearer ${user.accessToken}`
            }
        })

        respLoading.then(resp => {
            const room: IRoom = resp.data;
            openRoom(room);
            updateRoom(user)
        }).catch(err => {
            console.log(err)
            toast.error('Failed to open room')
        })
    }

    return (
        <nav className='bg-slate-100 col-span-1 min-h-[720px] p-4 flex flex-col gap-4 rounded shadow-xl'>
            <h1 className="text-xl text-slate-600">All Clients</h1>
            {
                client.map(client => {
                    return (
                        <button
                            key={client.id}
                            className="flex gap-2 border-1 border-black"
                            disabled={client.id === user.id}
                            onClick={() => createDM(client)}
                        >
                            <FaUserAlt size={24} />
                            <h1>{client.username} {client.id === user.id ? "(Me)" : ""}</h1>
                        </button>
                    )
                })
            }
        </nav>
    )
}
export default ClientList;