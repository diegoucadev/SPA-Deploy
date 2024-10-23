import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Users from './pages/Users.jsx'
import './index.css'
import NotFound from './pages/NotFound.jsx'

//Define all routes

const router = createBrowserRouter([
  { path: '/', element: <Home/>, errorElement: <NotFound/>},
  { path: '/users', element: <Users/>, errorElement: <NotFound/>}
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
