import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { RouterProvider } from "react-router";
import { router } from './router/router.jsx';
import ThemeProvider from './provider/ThemeProvider.jsx';
import AuthProvider from './provider/AuthProvider.jsx';
import { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

const queryClient = new QueryClient()


const stripePromise = loadStripe(import.meta.env.VITE_stripe_publishable_key);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Elements stripe={stripePromise}>
            <Toaster position="top-center"
              reverseOrder={false} />
            <RouterProvider router={router} />

          </Elements>

        </AuthProvider>
      </QueryClientProvider>



    </ThemeProvider>

  </StrictMode>,
)
