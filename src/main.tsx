import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"
import './globals.css'

// Import the layouts
import RootLayout from './layouts/root-layout'
import DashboardLayout from './layouts/dashboard-layout'
import AuthLayout from './layouts/auth-layout'

// Import the components
import LandingPage from './routes/landing'
import SignInPage from './routes/sign-in'
import SignUpPage from './routes/sign-up'
import DashboardPage from './routes/dashboard'
import ErrorPage from './routes/error'
import LandingLayout from './layouts/landing-layout'
import CodePage from './routes/code'
import ImagePage from './routes/image'
import VideoPage from './routes/video'
import MusicPage from './routes/music'
import SettingsPage from './routes/settings'
import ConversationPage from './routes/conversation'

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <LandingLayout />,
        children: [
          { path: '/', element: <LandingPage /> },
        ],
      },
      {
        path: "/",
        element: <AuthLayout />,
        children: [
          { path: "/sign-in/*", element: <SignInPage /> },
          { path: "/sign-up/*", element: <SignUpPage /> },
        ],
      },
      {
        path: "",
        element: <DashboardLayout />,
        children: [
          { path: "/dashboard", element: <DashboardPage /> },
          { path: "/code", element: <CodePage /> },
          { path: "/conversation", element: <ConversationPage /> },
          { path: "/image", element: <ImagePage /> },
          { path: "/video", element: <VideoPage /> },
          { path: "/music", element: <MusicPage /> },
          { path: "/settings", element: <SettingsPage /> },
        ],
      },
    ],
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);