import React from 'react'
import ReactDOM from 'react-dom/client'
import { NextUIProvider } from '@nextui-org/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import App from './pages/App.tsx'
import ProductsList from './pages/ProductsList.tsx'
import ProductDetails from './pages/ProductDetails.tsx'

import { loadProduct, loadProducts } from './api/utils.ts'

import AboutUs from './pages/AboutUs.tsx'
import DeliveryAndPayment from './pages/DeliveryAndPayment/DeliveryAndPayment.tsx'
import Contacts from './pages/Contacts.tsx'
import Home from './pages/Home.tsx'
import UserProfile from './pages/UserProfile.tsx'
import Checkout from './pages/Checkout.tsx'

import './index.css'

const queryClient = new QueryClient()

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children: [
      {
        path: '/home',
        element: <Home />,
      },
      {
        path: '/:category',
        element: <ProductsList />,
        loader: loadProducts
      },
      {
        path: '/:category/:productId',
        element: <ProductDetails />,
        loader: loadProduct
      },
      {
        path: '/about',
        element: <AboutUs />,
      },
      {
        path: '/delivery-and-payment',
        element: <DeliveryAndPayment />,
      },
      {
        path: '/contacts',
        element: <Contacts />,
      },
      {
        path: '/user-profile',
        element: <UserProfile />
      },
      {
        path: '/checkout',
        element: <Checkout />
      },
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <NextUIProvider>
        <RouterProvider router={router} />
      </NextUIProvider>
    </QueryClientProvider>
  </React.StrictMode>
)
