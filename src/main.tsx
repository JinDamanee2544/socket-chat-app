import ReactDOM from 'react-dom'
import './styles/App.css'
import { RouterProvider } from 'react-router-dom'
import router from 'routes'
import { AuthProvider } from 'context/auth'

const WrappedApp = () => {
    return (
        // <AuthProvider>
        <RouterProvider router={router} />
        // </AuthProvider>
    )
}
ReactDOM.render(<WrappedApp />, document.getElementById('root'))