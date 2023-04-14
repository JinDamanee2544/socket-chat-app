import Background from '@components/common/Background'
import { Link } from 'react-router-dom';
const Login = () => {
    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();
        alert(200)
    }
    return (
        <Background isCentered>
            <div className="bg-slate-200 rounded-xl shadow-xl p-8">
                <form className='flex flex-col gap-6'>
                    <h1 className='font-bold text-3xl text-center'>Login</h1>
                    <div>
                        <label className="block text-sm font-medium mb-2">
                            Email
                        </label>
                        <input
                            type="email"
                            className="py-3 px-4 block w-full border-slate-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500"
                            placeholder="you@gmail.com" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2">
                            Password
                        </label>
                        <input
                            type="password"
                            className="py-3 px-4 block w-full border-slate-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                    </div>
                    <button
                        type="submit"
                        className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-600 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 transition-all text-sm "
                        onClick={handleSubmit}
                    >
                        login
                    </button>
                    <Link to={'/register'}>
                        <p className='text-sm text-slate-600'>Do not have your account? &nbsp;
                            <span className='text-blue-600'>Register!</span>
                        </p>
                    </Link>
                </form>
            </div>
        </Background>
    )
}

export default Login