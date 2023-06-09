import { useAuth } from "context/auth";
import { useNavigate } from "react-router-dom";
import { FaUserAlt } from 'react-icons/fa'
import { MdOutlineExitToApp } from 'react-icons/md'
import { useWebSocket } from "context/ws";


const Navbar = () => {
    const { user, logout } = useAuth();
    const { clearConn } = useWebSocket()
    const navigate = useNavigate()

    const logoutHandler = () => {
        clearConn()
        logout();
    }

    const profileHandler = () => {
        clearConn()
        navigate('/profile')
    }

    return (
        <header className='bg-blue-600 col-span-4 text-slate-100 rounded p-4 flex justify-end gap-2'>
            <button className="flex gap-2 items-center"
                onClick={logoutHandler}
            >
                <MdOutlineExitToApp size={24} />
            </button>
            <button className="flex gap-2 items-center"
                onClick={profileHandler}
            >
                <h1 className='text-xl font-bold'>{user.username}</h1>
                <FaUserAlt size={24} />
            </button>
        </header>
    )
}
export default Navbar;
