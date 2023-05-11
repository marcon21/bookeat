import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom'
import './index.css'
import 'bootstrap/dist/css/bootstrap.css';

import MenuRoute from './routes/menuRoute'

const router = createBrowserRouter([
  {
    path: '/menu',
    element: <MenuRoute />,
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
