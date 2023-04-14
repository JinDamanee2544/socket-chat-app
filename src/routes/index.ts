import {createBrowserRouter} from 'react-router-dom'
import Chat from '@pages/Chat'
import Login from '@pages/Login'
import Profile from '@pages/Profile'
import Register from '@pages/Register'

const router = createBrowserRouter([
    {
        path: '/chat',
        Component: Chat,
    },
    {
        path: '/login',
        Component: Login,
    },
    {
        path: '/register',
        Component: Register,
    },
    {
        path: '/profile',
        Component: Profile,
    },
    {
        path: '/*',
        Component: null,
    }
])

export default router