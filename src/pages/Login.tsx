import Background from '@components/common/Background'
import { useAuth } from 'context/auth';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IUser } from 'types';
import apiClient from 'utils/apiClient';
import { toast } from 'react-toastify';

const Login = () => {
    const navigate = useNavigate()
    const { setUser } = useAuth();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        const respLoading = apiClient.post('/login', {
            email: email,
            password: password
        });
        respLoading.then((resp) => {
            const newUser: IUser = resp.data;
            setUser(newUser)
            toast.success('Login success!');
            navigate('/chat')
        }).catch((err) => {
            toast.error(err.response.data.message);
        });
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
                            value={email}
                            type="email"
                            className="py-3 px-4 block w-full border-slate-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500"
                            placeholder="you@gmail.com"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2">
                            Password
                        </label>
                        <input
                            value={password}
                            type="password"
                            className="py-3 px-4 block w-full border-slate-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button
                        type="submit"
                        className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-600 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 transition-all text-sm disabled:opacity-60"
                        disabled={email === '' || password === ''}
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