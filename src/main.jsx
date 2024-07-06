import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Main from './MainLayout/Main/Main';
import CreateBlog from './Sheared/Createblog/CreateBlog';
import UpdateBlog from './Sheared/UpdateBlog/UpdateBlog';
import AllBlog from './Sheared/AllBlog/AllBlog';

const router = createBrowserRouter([
  {
    path: "/",
    element:<Main></Main>,
    children:[
      {
        path:'/',
        element:<CreateBlog></CreateBlog>
      },
      {
        path:'/update-bog',
        element:<UpdateBlog></UpdateBlog>
      },
      {
        path:'/all-blogs',
        element:<AllBlog></AllBlog>
      },
      {
        path:'/all-blogs/update/:id',
        element:<UpdateBlog></UpdateBlog>
      }
      
    ]
  },
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <RouterProvider router={router} />
  </React.StrictMode>,
)
