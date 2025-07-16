import React from 'react';
import useUserRole from '../hooks/useUserRole';
import { Navigate } from 'react-router';
import Lottie from 'lottie-react';
import animation from "../assets/small_loading.json"

const AdminRoute = ({children}) => {

  const {role, roleLoading}=useUserRole();
  if(roleLoading){
    return <div className="flex justify-center items-center h-[50%]">
      <Lottie animationData={animation}  />
    </div>;
  }


  if(role!=="admin"){
    return <Navigate to={'/dashboard/forbidden'}></Navigate>
  }


    return children
 
};

export default AdminRoute;