import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from 'react-router-dom'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import './index.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

import MenuRoute, { loader as menuLoader } from './routes/menuRoute'
import LoginRoute from './routes/loginRoute'
import SignUpRoute from './routes/signUpRoute'
import DashboardRoute from './routes/dashboardRoute'
import StaffRoute, { loader as staffLoader } from './routes/staffRoute'
import EditMenuRoute, { loader as editMenuLoader } from './routes/editMenuRoute'
import TablesRoute from './routes/tablesRoute'
import BillHistoryRoute from './routes/billHistoryRoute'
import OrdersRoute from './routes/ordersRoute'
import ReservationsRoute from './routes/reservationsRoute'
import ProblemsRoute from './routes/problemsRoute'
import SettingsRoute, { loader as settingsRouteLoader } from './routes/settingsRoute'
import CheckOutRoute from './routes/checkoutRoute'

// Router of the app
const router = createBrowserRouter([
  {
    path: '/',
    element: <MenuRoute />,
    loader: menuLoader
  },
  {
    path: '/checkout',
    element: <CheckOutRoute />
  },
  {
    path: '/dashboard',
    element: <DashboardRoute />,
    children: [
      {
        path: '/dashboard/history',
        element: <BillHistoryRoute />,
      },
      {
        path: '/dashboard/staff',
        element: <StaffRoute />,
        loader: staffLoader
      },
      {
        path: '/dashboard/menu',
        element: <EditMenuRoute />,
        loader: editMenuLoader
      },
      {
        path: '/dashboard/tables',
        element: <TablesRoute />,
      },
      {
        path: '/dashboard/orders',
        element: <OrdersRoute />,
      },
      {
        path: '/dashboard/reservations',
        element: <ReservationsRoute />,
      },
      {
        path: '/dashboard/problems',
        element: <ProblemsRoute />,
      },
      {
        path: '/dashboard/settings',
        element: <SettingsRoute />,
        loader: settingsRouteLoader
      }
    ]
  },
  {
    path: '/settings',
    element: <SettingsRoute />,
    loader: settingsRouteLoader
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
    <ToastContainer
      position="bottom-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop
      closeOnClick
      rtl={false}
      pauseOnFocusLoss={false}
      draggable
      pauseOnHover
      theme="dark"
    />
  </React.StrictMode>,
)
