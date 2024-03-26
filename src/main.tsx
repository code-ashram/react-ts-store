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
import ProductDetails from './components/ProductDetails.tsx'

import { loadProduct, loadProducts } from './api/utils.ts'

import './index.css'

const queryClient = new QueryClient()

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children: [
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
