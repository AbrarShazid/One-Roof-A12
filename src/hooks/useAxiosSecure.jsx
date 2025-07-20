// import axios from 'axios';
// import React from 'react';
// import useAuth from './useAuth';
// import { useNavigate } from 'react-router';

// const axiosSecure = axios.create({
//   baseURL: `https://one-roof-a12-server.vercel.app`
//   // baseURL: `http://localhost:5000`
// })

// const useAxiosSecure = () => {
//   const { user, logOut } = useAuth()
//   const navigate = useNavigate()

//   axiosSecure.interceptors.request.use(
//     config => {
//       config.headers.authorization = `Bearer ${user?.accessToken}`;
//       return config;
//     },
//     error => {
//       return Promise.reject(error);
//     }
//   );
//   axiosSecure.interceptors.response.use(res => {
//     return res;
//   }, error => {
//     const status = error.response?.status;
//     if (status === 403) {
//       navigate('/forbidden')
//     }
//     else if (status === 401) {
//       logOut()
//         .then(() => {
//           navigate('/auth')
//         })
//         .catch(() => {

//         })

//     }

//     return Promise.reject(error)
//   }
//   )




//   return axiosSecure;
// };

// export default useAxiosSecure;

import axios from "axios";
import React, {  useEffect } from "react";
import useAuth from "./useAuth";
import { useNavigate } from "react-router";

const axiosInstance = axios.create({
    baseURL: `https://one-roof-a12-server.vercel.app`
//  baseURL: `http://localhost:5000`
});

const useAxiosSecure = () => {
  const { user, logOut, loading } = useAuth();
  const navigate=useNavigate()

  useEffect(() => {
    if (!loading && user?.accessToken) {
      // Add request interceptor
      const requestInterceptor = axiosInstance.interceptors.request.use(
        (config) => {
          config.headers.Authorization = `Bearer ${user.accessToken}`;
          return config;
        }
      );

      // Add response interceptor
      const responseInterceptor = axiosInstance.interceptors.response.use(
        (res) => res,
        (err) => {
          const status=err?.response?.status;
          if (status === 401) {
            logOut()
              .then(() => {
                navigate('/auth');
              })
              .catch(console.error);
          }
          else if(status===403){
            navigate('/forbidden')
          }
          return Promise.reject(err);
        }
      );
      // Cleanup to prevent multiple interceptors on re-renders
      return () => {
        axiosInstance.interceptors.request.eject(requestInterceptor);
        axiosInstance.interceptors.response.eject(responseInterceptor);
      };
    }
  }, [user, loading,logOut]);

  return axiosInstance;
};

export default useAxiosSecure;