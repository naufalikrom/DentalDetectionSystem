import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import Login from './components/pages/auth/loginPage.tsx'
import Register from './components/pages/auth/registerPage.tsx'
import ErrorPage from './components/pages/404Page.tsx'
import Dashboard from './components/pages/dashboard/dashboardPage.tsx'
import AbnormalitiesPage from './components/pages/dashboard/abnormalitiesPage.tsx'
import OnGoingPage from './components/pages/onGoingPage.tsx'
import { Toaster } from 'sonner'
import PanoramicPage from './components/pages/panoramic/panoramicPage.tsx'
import UploadPanoramic from './components/pages/panoramic/uploadPanoramic.tsx'
import EditPanoramic from './components/pages/panoramic/editPanoramic.tsx'

function HomeRedirect() {
    return <Navigate to="/dashboard#home" replace />;
}

const router = createBrowserRouter([
  {
    path:"/",
    element: <HomeRedirect />,
    errorElement: <ErrorPage />
  },
  {
    path:"/login",
    element:<Login/>
  },
  {
    path:"/register",
    element:<Register/>
  },
  {
    path:"/dashboard",
    element:<Dashboard/>
  },
  {
    path:"/abnormalities/:id",
    element:<AbnormalitiesPage/>
  },
  {
    path:"/Development",
    element:<OnGoingPage/>
  },
  {
    path:"/panoramic",
    element:<PanoramicPage/>
  },
  {
    path:"/uploadPanoramic",
    element:<UploadPanoramic/>
  },
  {
    path:"/editPanoramic/:no_rm",
    element:<EditPanoramic/>
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Toaster position="top-right"/>
    <RouterProvider router={router}/>
  </StrictMode>,
)
