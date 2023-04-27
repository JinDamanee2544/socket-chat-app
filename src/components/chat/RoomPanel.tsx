import { IRoom } from "types"
import { MdStart } from 'react-icons/md'
import apiClient from "utils/apiClient";
import { toast } from 'react-toastify'
import { useAuth } from "context/auth";
import { useRoom } from "context/room";
import { useRef } from "react";

interface IRoomSelectPanel {
    openRoom: (room: IRoom) => void;
}

const RoomSelectPanel = (props: IRoomSelectPanel) => {
    const { room } = useRoom();
    const { user } = useAuth();
    const { openRoom } = props;
    const inputRef = useRef<HTMLInputElement>(null);

    const createPublicRoom = (e: React.SyntheticEvent) => {
        e.preventDefault();
        if (!inputRef.current?.value) return;

        const respLoading = apiClient.post('ws/createRoom', {
            name: inputRef.current.value,
            category: 'public'
        }, {
            headers: {
                Authorization: `Bearer ${user.accessToken}`
            }
        })

        respLoading.then(resp => {
            const room: IRoom = resp.data;
            openRoom(room);
        }).catch(() => {
            toast.error('Failed to create room')
        })
    }

    return (
        <nav className='bg-slate-100 col-span-1 min-h-[720px] p-4 flex flex-col gap-4 rounded shadow-xl'>
            <h1 className="text-xl text-slate-600">All Rooms</h1>
            <div className="flex flex-col gap-2 justify-between h-full">
                <div className='flex flex-col gap-2'>
                    {
                        room.map((room) => {
                            return (
                                <button
                                    key={room.id}
                                    className='w-full py-3 px-4 rounded-md flex justify-between text-slate-100 bg-blue-600 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 transition-all text-sm'
                                    onClick={() => openRoom(room)}
                                >
                                    {room.name}
                                    {/* ({room.clients?.length || 0}) */}
                                    <MdStart size={24} />
                                </button>
                            )
                        })
                    }
                </div>
                <form className='flex gap-2'>
                    <input
                        ref={inputRef}
                        type="text"
                        className="py-3 px-4 block w-full border-slate-400 rounded-md text-sm focus:border-blue-600 focus:ring-blue-600 "
                    />
                    <button
                        type="submit"
                        className="p-2 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-600 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 transition-all text-sm "
                        onClick={createPublicRoom}
                    >
                        Create Room
                    </button>
                </form>
            </div>
        </nav>
    )
}
export default RoomSelectPanel