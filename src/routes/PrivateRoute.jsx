import React from 'react';
import useAuth from '../hooks/useAuth';
import Loading from "../Components/Loading"
import { Navigate, useLocation } from 'react-router';
import Lottie from 'lottie-react';
import animationLoading from "../assets/small_loading.json"

const PrivateRoute = ({children}) => {
  const {user,loading}=useAuth();
  const location =useLocation()



if(loading){
  return <Lottie animationData={animationLoading} className='md:h-40 lg:h-52'></Lottie>
}
if(!user){
  return  <Navigate to={'/auth'} state={{from:location.pathname}}></Navigate>
}


  return children
};

export default PrivateRoute;