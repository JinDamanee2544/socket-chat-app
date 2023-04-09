import { Room } from "types"
import { MdStart } from 'react-icons/md'

const RoomList: Room[] = [
    {
        id: 1,
        name: 'Room 1',
    },
    {
        id: 2,
        name: 'Room 2',
    },
]

interface IRoomSelectPanel {
    setCurrentRoom: (room: Room) => void;
}

const RoomSelectPanel = (props: IRoomSelectPanel) => {
    const { setCurrentRoom } = props;
    return (
        <nav className='bg-slate-100 col-span-1 min-h-[720px] p-4 flex flex-col gap-4 rounded shadow-xl'>
            <h1 className="text-xl text-slate-600">All Rooms</h1>
            {
                RoomList.map((room) => {
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