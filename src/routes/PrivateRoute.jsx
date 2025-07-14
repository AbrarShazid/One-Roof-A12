import React from 'react';
import useAuth from '../hooks/useAuth';
import Loading from "../Components/Loading"
import { Navigate, useLocation } from 'react-router';

const PrivateRoute = ({children}) => {
  const {user,loading}=useAuth();
  const location =useLocation()



if(loading){
 <Loading></Loading>
}
if(!user){
  return  <Navigate to={'/auth'} state={{from:location.pathname}}></Navigate>
}


  return children
};

export default PrivateRoute;