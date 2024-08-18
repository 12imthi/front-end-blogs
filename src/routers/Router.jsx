import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/home/Home";
import About from "../pages/miniPages/About";
import PrivacyPolicy from "../pages/miniPages/PrivacyPolicy";
import ContactUs from '../pages/miniPages/ContactUs';
import SingleBlog from "../pages/blogs/singleBlog/SingleBlog";
import Login from "../pages/users/Login";
import Register from "../pages/users/Register";
import AdminLayout from "../pages/admin/AdminLayout";
import DashBoard from "../pages/admin/DashBorad/DashBoard";
import AddPost from "../pages/admin/post/AddPost";
import ManagePost from "../pages/admin/post/ManagePost";
import ManageUser from "../pages/admin/user/ManageUser";
import PrivateRouter from "./PrivateRouter";
import UpdatePost from "../pages/admin/post/UpdatePost";


const router = createBrowserRouter([
    {
      path: "/",
      element: <App/>,
      children : [
        {
          path: "/",
          element: <Home/>
        },
        {
          path: "/about-us",
          element : <About/>
        },
        {
          path: "/privacy-policy",
          element : <PrivacyPolicy/>
        },
        {
          path: "/contact-us",
          element : <ContactUs/>
        },
        {
          path: "blogs/:id",
          element : <SingleBlog/>
        },
        {
          path: "/login",
          element : <Login/>
        },
        {
          path: "/register",
          element : <Register/>
        },
        {
          path: "dashBoard",
          element : <PrivateRouter><AdminLayout/></PrivateRouter> , // it will be procted by the admin: Use private
          children: [
            {
              path: '',
              element: <DashBoard/>
            },
            {
              path: 'add-new-post',
              element: <AddPost/>
            },
            {
              path: 'manage-items',
              element: <ManagePost/>
            },
            {
              path: 'users',
              element: <ManageUser/>
            },
            {
              path: 'update-items/:id',
              element: <UpdatePost/>
            },
          ]
        }
      ]
    },
  ]);
  

  export default router;