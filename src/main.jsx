import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import {
  RouterProvider,
} from "react-router";
import { router } from './router/router.jsx';
import ThemeProvider from './provider/ThemeProvider.jsx';
import AuthProvider from './provider/AuthProvider.jsx';
import { Toaster } from 'react-hot-toast';



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>

      <AuthProvider>
      <Toaster  position="top-center"
  reverseOrder={false}/>
        <RouterProvider router={router} />
      </AuthProvider>

    </ThemeProvider>

  </StrictMode>,
)
