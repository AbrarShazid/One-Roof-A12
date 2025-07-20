import axios from 'axios';
import React from 'react';
import useAuth from './useAuth';
import { useNavigate } from 'react-router';

const axiosSecure = axios.create({
  baseURL: `https://one-roof-a12-server.vercel.app`
})

const useAxiosSecure = () => {
  const { user, logOut } = useAuth()
  const navigate = useNavigate()

  axiosSecure.interceptors.request.use(
    config => {
      config.headers.authorization = `Bearer ${user?.accessToken}`;
      return config;
    },
    error => {
      return Promise.reject(error);
    }
  );
  

  axiosSecure.interceptors.response.use(res => {
    return res;
  }, error => {
    const status = error.response?.status;
    if (status === 403) {
      console.log(status);
      
      navigate('/forbidden')
    }
    else if (status === 401) {
      logOut()
        .then(() => {
          navigate('/auth')
        })
        .catch(() => {

        })

    }

    return Promise.reject(error)
  }
  )




  return axiosSecure;
};

export default useAxiosSecure;

