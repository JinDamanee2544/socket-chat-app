import { Room, User } from "types";

const mockUserList: User[] = [
    {
        id: 1,
        name: 'John Doe',
        image: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80'
    },
    {
        id: 2,
        name: 'Jane Doe',
        image: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80'
    }
]

interface IClientList {
    setCurrentRoom: (room: Room) => void;
}

const ClientList = (props: IClientList) => {
    const { setCurrentRoom } = props;
    return (
        <nav className='bg-slate-100 col-span-1 min-h-[720px] p-4 flex flex-col gap-4 rounded shadow-xl'>
            <h1 className="text-xl text-slate-600">All Clients</h1>
            {
                mockUserList.map(user => {
                    return (
                        <button key={user.id} className="flex gap-2 border-1 border-black"
                            onClick={() => setCurrentRoom(
                                {
                                    id: user.id,
                                    name: user.name,
                                }
                            )}
                        >
                            <img
                                className="ml-2 inline-block h-6 w-6 rounded-full ring-white"
                                src={user.image}
                                alt="Image Description"
                            />
                            <div
                                key={user.id}
                                className=""
                            >
                                {user.name}
                            </div>
                        </button>
                    )
                })
            }
        </nav>
    )
}
export default ClientList;