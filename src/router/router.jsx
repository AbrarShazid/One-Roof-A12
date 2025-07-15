import { createBrowserRouter } from "react-router";
import HomeLayout from "../layouts/HomeLayout";
import Home from "../pages/Home";
import Apartments from "../pages/Apartments";
import AuthLayOut from "../layouts/AuthLayOut";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Error from "../pages/Error";
import PrivateRoute from "../routes/PrivateRoute"
import DashboardLayout from "../layouts/DashboardLayout"
import DashboardHome from "../pages/dashboard/DashboardHome";
import ProfilePage from "../pages/dashboard/ProfilePage";
import Announcement from "../pages/dashboard/Announcement";





export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout></HomeLayout>,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/apartments",
        element: <Apartments />,
      },
    ],
  },

  {
    path:"/auth",
    element:<AuthLayOut></AuthLayOut>,
    children:[
      {
        index:true,
        element:<Login></Login>
      },
      {
        path:"register",
        element:<Register></Register>
      }

    ]

  },


  {
    path: "/dashboard",
    element:<PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
    children:[

        {
          index:true,
          element:<DashboardHome></DashboardHome>
        },
        {
          path:'profile',
          element:<ProfilePage></ProfilePage>
        },
        {
          path:"announcement",
          element:<Announcement></Announcement>
        }






    ]
  





  },
  {
    path: "*",
    element:<Error></Error>
  }



]);
