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
import DashboardRoute from './routes/dashboardRoute'

// Router of the app
const router = createBrowserRouter([
  {
    path: '/',
    element: <MenuRoute />,
    loader: menuLoader
  },
  {
    path: '/dashboard',
    element: <DashboardRoute />
  },
  {
    path: '/login',
    element: <LoginRoute />
  },
  {
    path: '/signup',
    element: <SignUpRoute />
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
