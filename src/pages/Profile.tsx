import Background from '@components/common/Background'
import { useAuth } from 'context/auth';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoArrowBackOutline } from 'react-icons/io5'
import apiClient from 'utils/apiClient';
import { toast } from 'react-toastify';
import { IAuth } from 'types';

const Profile = () => {
    const { user, setUser, logout } = useAuth();
    const [email, setEmail] = useState(user.email || '');
    const [username, setUsername] = useState(user.username || "");
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmitUpdateInfo = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        const respLoading = apiClient.patch('/user/self', {
            email,
            username
        }, {
            headers: {
                Authorization: `Bearer ${user.accessToken}`
            }
        })
        respLoading.then(() => {
            const newProfile: IAuth = {
                ...user,
                email: email,
                username: username
            }
            setUser(newProfile);
            toast.success('Update profile success');
            navigate('/login');
            logout();
        }).catch((err) => {
            console.log(err);
            toast.error('Update profile failed');
        })
    }

    const handleSubmitUpdatePassword = async (e: React.SyntheticEvent) => {
        e.preventDefault();

        const respLoading = apiClient.patch('/user/self/password', {
            password,
        }, {
            headers: {
                Authorization: `Bearer ${user.accessToken}`
            }
        })

        respLoading.then(() => {
            toast.success('Update password success');
            navigate('/login');
            logout();
        }).catch((err) => {
            console.log(err);
            toast.error('Update password failed');
        })
    }


    return (
        <Background isCentered>
            <div className=" bg-slate-200 rounded-xl shadow-xl p-8">
                <BackButton />
                <form className='flex flex-col gap-6 -mt-8'>
                    <h1 className='font-bold text-3xl text-center'>Change Profile</h1>
                    <div>
                        <label className="block text-sm font-medium mb-2">
                            Username
                        </label>
                        <input
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            type="email"
                            className="py-3 px-4 block w-full border-slate-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2">
                            Email
                        </label>
                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            className="py-3 px-4 block w-full border-slate-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                    </div>
                    <button
                        type="submit"
                        className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-600 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 transition-all text-sm disabled:opacity-60"
                        disabled={email === '' || username === ''}
                        onClick={handleSubmitUpdateInfo}
                    >
                        Update Info
                    </button>
                </form>
                <form className='flex flex-col gap-6 mt-4'>
                    <div>
                        <label className="block text-sm font-medium mb-2">
                            Password
                        </label>
                        <input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            className="py-3 px-4 block w-full border-slate-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                    </div>
                    <button
                        type="submit"
                        className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-600 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 transition-all text-sm disabled:opacity-60"
                        disabled={password === ''}
                        onClick={handleSubmitUpdatePassword}
                    >
                        Update Info
                    </button>
                </form>
            </div>
        </Background>
    )
}
export default Profile

const BackButton = () => {
    const navigate = useNavigate()
    return (
        <button
            type="button"
            className="relative right-12 bottom-12 p-2 border border-transparent font-semibold bg-blue-500 rounded-full text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm"
            onClick={() => navigate('/chat')}
        >
            <IoArrowBackOutline size={24} />
        </button>
    )
}