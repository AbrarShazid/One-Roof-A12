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
import Forbidden from "../pages/Forbidden";
import AdminRoute from "../routes/AdminRoute";
import MakeAnnouncement from "../pages/dashboard/admin/MakeAnnouncement";
import ManageMembers from "../pages/dashboard/admin/ManageMembers"
import AgreementReq from "../pages/dashboard/admin/AgreementReq"

import ManageCoupon from "../pages/dashboard/admin/ManageCoupon"
import MemberRoute from "../routes/MemberRoute";
import MakePayment from "../pages/dashboard/member/MakePayment";
import PaymentHistory from "../pages/dashboard/member/PaymentHistory";





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
    path: "/auth",
    element: <AuthLayOut></AuthLayOut>,
    children: [
      {
        index: true,
        element: <Login></Login>
      },
      {
        path: "register",
        element: <Register></Register>
      }

    ]

  },


  {
    path: "/dashboard",
    element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
    children: [

      {
        index: true,
        element: <DashboardHome></DashboardHome>
      },
      {
        path: 'profile',
        element: <ProfilePage></ProfilePage>
      },





      // only member router  

      {

        path:"make-payment",
        element:<MemberRoute> <MakePayment></MakePayment> </MemberRoute>
      },

      {
        path:"pay-history",
        element:<MemberRoute> <PaymentHistory></PaymentHistory>  </MemberRoute>

      },








      // announcement for both user and member  

      {
        path: "announcement",
        element: <Announcement></Announcement>
      },


      // only admin router 
      {
        path: "manage-members",
        element: <AdminRoute><ManageMembers></ManageMembers></AdminRoute>

      },


      {
        path: 'make-announcement',
        element: <AdminRoute>  <MakeAnnouncement></MakeAnnouncement>   </AdminRoute>
      },
      {
        path: 'agreement-req',
        element: <AdminRoute> <AgreementReq></AgreementReq> </AdminRoute>


      },

      {
        path: 'manage-coupons',
        element: <AdminRoute> <ManageCoupon></ManageCoupon>  </AdminRoute>

      },








      // forbidden page router  

      {
        path: 'forbidden',
        element: <Forbidden></Forbidden>
      }











    ]






  },
  {
    path: "*",
    element: <Error></Error>
  }



]);
