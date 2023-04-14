import ReactDOM from 'react-dom'
import './styles/App.css'
import { RouterProvider } from 'react-router-dom'
import router from 'routes'
import { AuthProvider } from 'context/auth'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const WrappedApp = () => {
    return (
        <AuthProvider>
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
        </AuthProvider>
    )
}
ReactDOM.render(<WrappedApp />, document.getElementById('root'))