import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import { RouterProvider } from "react-router";
import { router } from './router/router.jsx';
import ThemeProvider from './provider/ThemeProvider.jsx';
import AuthProvider from './provider/AuthProvider.jsx';
import { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Toaster position="top-center"
            reverseOrder={false} />
          <RouterProvider router={router} />
        </AuthProvider>
      </QueryClientProvider>



    </ThemeProvider>

  </StrictMode>,
)
