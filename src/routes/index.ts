import {createBrowserRouter} from 'react-router-dom'
import Chat from '../pages/Chat'

const router = createBrowserRouter([
    {
        path: '/',
        Component: Chat
    }
])

export default router