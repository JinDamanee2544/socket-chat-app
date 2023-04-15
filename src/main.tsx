import ReactDOM from 'react-dom'
import './styles/App.css'
import { RouterProvider } from 'react-router-dom'
import router from 'routes'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import AuthProvider from 'context/auth'
import WebSocketProvider from 'context/ws'
import RoomProvider from 'context/room'
import ClientProvider from 'context/client'

const WrappedApp = () => {
    return (
        <AuthProvider>
            <WebSocketProvider>
                <RoomProvider>
                    <ClientProvider>
                        <RouterProvider router={router} />
                        <ToastContainer
                            position="bottom-left"
                            autoClose={5000}
                            hideProgressBar={false}
                            newestOnTop={false}
                            closeOnClick
                            rtl={false}
                            pauseOnFocusLoss
                            draggable
                            pauseOnHover
                            theme="light"
                        />
                    </ClientProvider>
                </RoomProvider>
            </WebSocketProvider>
        </AuthProvider>
    )
}
ReactDOM.render(<WrappedApp />, document.getElementById('root'))