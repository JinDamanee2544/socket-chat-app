import { IRoom } from "types"
import { MdStart } from 'react-icons/md'
import { useEffect, useState } from "react";
import apiClient from "utils/apiClient";
import { toast } from 'react-toastify'
import { AxiosError } from 'axios'
import { useAuth } from "context/auth";

interface IRoomSelectPanel {
    setCurrentRoom: (room: IRoom) => void;
}

const RoomSelectPanel = (props: IRoomSelectPanel) => {
    const { user } = useAuth();
    const [roomList, setRoomList] = useState<IRoom[]>([]);
    const { setCurrentRoom } = props;

    useEffect(() => {
        const respLoading = apiClient.get('/ws/getRooms', {
            headers: {
                Authorization: `Bearer ${user.accessToken}`
            }
        });
        respLoading.then((resp) => {
            setRoomList(resp.data);
            toast.success('Rooms loaded successfully');
        }).catch((err) => {
            if (err instanceof AxiosError) {
                toast.error(err.response?.data.error);
            }
        })
    }, [])

    return (
        <nav className='bg-slate-100 col-span-1 min-h-[720px] p-4 flex flex-col gap-4 rounded shadow-xl'>
            <h1 className="text-xl text-slate-600">All Rooms</h1>
            {
                roomList.map((room) => {
                    return (
                        <button
                            key={room.id}
                            className='w-full py-3 px-4 rounded-md flex justify-between text-slate-100 bg-blue-600 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 transition-all text-sm'
                            onClick={() => setCurrentRoom(room)}
                        >
                            {room.name}
                            <MdStart size={24} />
                        </button>
                    )
                })
            }
        </nav>
    )
}
export default RoomSelectPanel