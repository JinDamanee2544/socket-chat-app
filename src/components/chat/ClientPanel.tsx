import { useEffect, useState } from "react";
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

    const dmHandler = (toUser: IUser) => {
        if (room.find(r => r.name === `DM to ${toUser.username}`)) {
            toast.error('Room already opened')
            return;
        }
        const respLoading = apiClient.post('ws/createRoom', {
            name: `DM to ${toUser.username}`
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
        <nav className='bg-slate-100 col-span-1 min-h-[720px] p-4 flex flex-col gap-4 rounded shadow-xl'>
            <h1 className="text-xl text-slate-600">All Clients</h1>
            {
                client.map(client => {
                    return (
                        <button
                            key={client.id}
                            className="flex gap-2 border-1 border-black"
                            disabled={client.id === user.id}
                            onClick={() => dmHandler(client)}
                        >
                            <FaUserAlt size={24} />
                            <h1>{client.username}</h1>
                        </button>
                    )
                })
            }
        </nav>
    )
}
export default ClientList;