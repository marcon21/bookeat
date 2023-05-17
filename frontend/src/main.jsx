import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom'

import './index.css'
import 'bootstrap/dist/css/bootstrap.css';

import MenuRoute, { loader as menuLoader } from './routes/menuRoute'
import LoginRoute from './routes/loginRoute'

// Router of the app
const router = createBrowserRouter([
  {
    path: '/menu',
    element: <MenuRoute />,
    loader: menuLoader
  },
  {
    path: '/login',
    element: <LoginRoute />
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
