import ReactDOM from 'react-dom'
import './styles/App.css'
import { RouterProvider } from 'react-router-dom'
import router from 'routes'

const WrappedApp = () => {
    return (
        <RouterProvider router={router} />
    )
}
ReactDOM.render(<WrappedApp />, document.getElementById('root'))