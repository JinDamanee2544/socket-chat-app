import {createBrowserRouter} from 'react-router-dom'
import Chat from '@pages/Chat'
import login from '@pages/login'
import Profile from '@pages/Profile'

const router = createBrowserRouter([
    {
        path: '/chat',
        Component: Chat,
    },
    {
        path: '/login',
        Component: login,
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