// import { createBrowserRouter } from "react-router";
// import HomeLayout from "../layouts/HomeLayout";
// import Home from "../pages/Home";
// import Apartments from "../pages/Apartments";
// import AuthLayOut from "../layouts/AuthLayOut";
// import Login from "../pages/Login";
// import Register from "../pages/Register";
// import Error from "../pages/Error";
// import PrivateRoute from "../routes/PrivateRoute"
// import DashboardLayout from "../layouts/DashboardLayout"
// import DashboardHome from "../pages/dashboard/DashboardHome";
// import ProfilePage from "../pages/dashboard/ProfilePage";
// import Announcement from "../pages/dashboard/Announcement";
// import Forbidden from "../pages/Forbidden";
// import AdminRoute from "../routes/AdminRoute";
// import MakeAnnouncement from "../pages/dashboard/admin/MakeAnnouncement";
// import ManageMembers from "../pages/dashboard/admin/ManageMembers"
// import AgreementReq from "../pages/dashboard/admin/AgreementReq"

// import ManageCoupon from "../pages/dashboard/admin/ManageCoupon"
// import MemberRoute from "../routes/MemberRoute";
// import MakePayment from "../pages/dashboard/member/MakePayment";
// import PaymentHistory from "../pages/dashboard/member/PaymentHistory";
// import Payment from "../pages/dashboard/member/Payment";



// export const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <HomeLayout></HomeLayout>,
//     children: [
//       {
//         index: true,
//         element: <Home />,
//       },
//       {
//         path: "/apartments",
//         element: <Apartments />,
//       },
//     ],
//   },

//   {
//     path: "/auth",
//     element: <AuthLayOut></AuthLayOut>,
//     children: [
//       {
//         index: true,
//         element: <Login></Login>
//       },
//       {
//         path: "register",
//         element: <Register></Register>
//       }

//     ]

//   },

//   {
//     path: "/dashboard",
//     element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
//     children: [

//       {
//         index: true,
//         element: <DashboardHome></DashboardHome>
//       },
//       {
//         path: 'profile',
//         element: <ProfilePage></ProfilePage>
//       },

//       // only member router  
//       {
//         path: "make-payment",
//         element: <MemberRoute> <MakePayment></MakePayment> </MemberRoute>
//       },
//       {
//         path: 'payment',
//         element: <MemberRoute><Payment></Payment></MemberRoute>
//       },
//       {
//         path: "pay-history",
//         element: <MemberRoute> <PaymentHistory></PaymentHistory>  </MemberRoute>
//       },

//       // announcement for both user and member  
//       {
//         path: "announcement",
//         element: <Announcement></Announcement>
//       },

//       // only admin router 
//       {
//         path: "manage-members",
//         element: <AdminRoute><ManageMembers></ManageMembers></AdminRoute>
//       },
//       {
//         path: 'make-announcement',
//         element: <AdminRoute>  <MakeAnnouncement></MakeAnnouncement>   </AdminRoute>
//       },
//       {
//         path: 'agreement-req',
//         element: <AdminRoute> <AgreementReq></AgreementReq> </AdminRoute>
//       },
//       {
//         path: 'manage-coupons',
//         element: <AdminRoute> <ManageCoupon></ManageCoupon>  </AdminRoute>
//       },

//     // forbidden page router  
//       {
//         path: 'forbidden',
//         element: <Forbidden></Forbidden>
//       }

//     ]
//   },
//   {
//     path: "*",
//     element: <Error></Error>
//   }

// ]);










import { createBrowserRouter } from "react-router";
import React, { lazy, Suspense } from "react";
import PrivateRoute from "../routes/PrivateRoute";
import AdminRoute from "../routes/AdminRoute";
import MemberRoute from "../routes/MemberRoute";


// Fallback UI during lazy load
import Loading from "../Components/SuspenseLoading"

// Layouts
const HomeLayout = lazy(() => import("../layouts/HomeLayout"));
const AuthLayOut = lazy(() => import("../layouts/AuthLayOut"));
const DashboardLayout = lazy(() => import("../layouts/DashboardLayout"));

// Public pages
const Home = lazy(() => import("../pages/Home"));
const Apartments = lazy(() => import("../pages/Apartments"));
const Login = lazy(() => import("../pages/Login"));
const Register = lazy(() => import("../pages/Register"));
const Error = lazy(() => import("../pages/Error"));
const Forbidden = lazy(() => import("../pages/Forbidden"));

// Dashboard pages
const DashboardHome = lazy(() => import("../pages/dashboard/DashboardHome"));
const ProfilePage = lazy(() => import("../pages/dashboard/ProfilePage"));
const Announcement = lazy(() => import("../pages/dashboard/Announcement"));

// Admin pages
const MakeAnnouncement = lazy(() => import("../pages/dashboard/admin/MakeAnnouncement"));
const ManageMembers = lazy(() => import("../pages/dashboard/admin/ManageMembers"));
const AgreementReq = lazy(() => import("../pages/dashboard/admin/AgreementReq"));
const ManageCoupon = lazy(() => import("../pages/dashboard/admin/ManageCoupon"));

// Member pages
const MakePayment = lazy(() => import("../pages/dashboard/member/MakePayment"));
const PaymentHistory = lazy(() => import("../pages/dashboard/member/PaymentHistory"));
const Payment = lazy(() => import("../pages/dashboard/member/Payment"));

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<Loading />}>
        <HomeLayout />
      </Suspense>
    ),
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<Loading />}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: "apartments",
        element: (
          <Suspense fallback={<Loading />}>
            <Apartments />
          </Suspense>
        ),
      },
    ],
  },

  {
    path: "/auth",
    element: (
      <Suspense fallback={<Loading />}>
        <AuthLayOut />
      </Suspense>
    ),
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<Loading />}>
            <Login />
          </Suspense>
        ),
      },
      {
        path: "register",
        element: (
          <Suspense fallback={<Loading />}>
            <Register />
          </Suspense>
        ),
      },
    ],
  },

  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Suspense fallback={<Loading />}>
          <DashboardLayout />
        </Suspense>
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<Loading />}>
            <DashboardHome />
          </Suspense>
        ),
      },
      {
        path: "profile",
        element: (
          <Suspense fallback={<Loading />}>
            <ProfilePage />
          </Suspense>
        ),
      },

      // Member routes
      {
        path: "make-payment",
        element: (
          <MemberRoute>
            <Suspense fallback={<Loading />}>
              <MakePayment />
            </Suspense>
          </MemberRoute>
        ),
      },
      {
        path: "pay-history",
        element: (
          <MemberRoute>
            <Suspense fallback={<Loading />}>
              <PaymentHistory />
            </Suspense>
          </MemberRoute>
        ),
      },
      {
        path: "payment",
        element: (
          <MemberRoute>
            <Suspense fallback={<Loading />}>
              <Payment />
            </Suspense>
          </MemberRoute>
        ),
      },

      // Announcement (shared)
      {
        path: "announcement",
        element: (
          <Suspense fallback={<Loading />}>
            <Announcement />
          </Suspense>
        ),
      },

      // Admin routes
      {
        path: "make-announcement",
        element: (
          <AdminRoute>
            <Suspense fallback={<Loading />}>
              <MakeAnnouncement />
            </Suspense>
          </AdminRoute>
        ),
      },
      {
        path: "manage-members",
        element: (
          <AdminRoute>
            <Suspense fallback={<Loading />}>
              <ManageMembers />
            </Suspense>
          </AdminRoute>
        ),
      },
      {
        path: "agreement-req",
        element: (
          <AdminRoute>
            <Suspense fallback={<Loading />}>
              <AgreementReq />
            </Suspense>
          </AdminRoute>
        ),
      },
      {
        path: "manage-coupons",
        element: (
          <AdminRoute>
            <Suspense fallback={<Loading />}>
              <ManageCoupon />
            </Suspense>
          </AdminRoute>
        ),
      },

      // Forbidden
      {
        path: "forbidden",
        element: (
          <Suspense fallback={<Loading />}>
            <Forbidden />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "/forbidden",
    element: (
      <Suspense fallback={<Loading />}>
        <Forbidden />
      </Suspense>
    ),
  },

  {
    path: "*",
    element: (
      <Suspense fallback={<Loading />}>
        <Error />
      </Suspense>
    ),
  },
]);
