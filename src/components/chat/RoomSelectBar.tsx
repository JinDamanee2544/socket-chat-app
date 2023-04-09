import { Room } from "types"

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

interface IRoomSelectBar {
    setCurrentRoom: (room: Room) => void;
}

const RoomSelectBar = (props: IRoomSelectBar) => {
    const { setCurrentRoom } = props;
    return (
        <nav className='bg-slate-100 min-w-[200px] min-h-[80%] m-4 p-4 flex flex-col gap-4 rounded'>
            <h1 className="text-xl text-slate-600">All Rooms</h1>
            {
                RoomList.map((room) => {
                    return (
                        <button
                            key={room.id}
                            className='w-full py-3 px-4 rounded-md text-slate-100 bg-blue-600 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 transition-all text-sm'
                            onClick={() => setCurrentRoom(room)}
                        >
                            {room.name}
                        </button>
                    )
                })
            }
        </nav>
    )
}
export default RoomSelectBar