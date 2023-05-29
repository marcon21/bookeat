import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from 'react-router-dom'

import './index.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

import MenuRoute, { loader as menuLoader } from './routes/menuRoute'
import LoginRoute from './routes/loginRoute'
import SignUpRoute from './routes/signUpRoute'

const isLoggedIn = document.cookie.split(';').some((item) => item.trim().startsWith('jwt='))

// Router of the app
const router = createBrowserRouter([
  {
    path: '/menu',
    element: <MenuRoute />,
    loader: menuLoader
  },
  {
    path: '/login',
    element: isLoggedIn ? <Navigate to={"/menu"} /> : <LoginRoute />
  },
  {
    path: '/signup',
    element: isLoggedIn ? <Navigate to={"/menu"} /> : <SignUpRoute />
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
