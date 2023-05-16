import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom'

import './index.css'
import 'bootstrap/dist/css/bootstrap.css';

import MenuRoute, { loader as menuLoader } from './routes/menuRoute'

// Router of the app
const router = createBrowserRouter([
  {
    path: '/menu',
    element: <MenuRoute />,
    loader: menuLoader
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
