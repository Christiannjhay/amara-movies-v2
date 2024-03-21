import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Header from './assets/components/header/Header'
import HomePage from './assets/components/pages/HomePage'
import ViewMovie from './assets/components/pages/VIewMovie'
const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />
  },
  {
    path: "/view-movie/:id",
    element: <ViewMovie  />
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <div className='w-100% h-fit bg-[#181818] '>
          <Header/>
          <RouterProvider router={router}>
          </RouterProvider>
      </div>
  </React.StrictMode>,
)
