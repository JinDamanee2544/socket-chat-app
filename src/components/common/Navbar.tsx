import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate()
    return (
        <header className='bg-blue-600 col-span-4 text-slate-100 rounded p-4 flex justify-end'>
            <button className="flex gap-2 items-center"
                onClick={() => navigate('/profile')}
            >
                <h1 className='text-xl font-bold'>John Doe</h1>
                <img
                    className="ml-2 inline-block h-8 w-8 rounded-full ring-white"
                    src={'https://i.pravatar.cc/300'}
                    alt="Image Description"
                />
            </button>
        </header>
    )
}
export default Navbar;
