import React from 'react';
import useUserRole from '../../hooks/useUserRole';
import UserProfile from "./user/UserProfile"
import MemberProfile from "./member/MemberProfile"
import AdminProfile from "./admin/AdminProfile"

import Forbidden from '../Forbidden';



const ProfilePage = () => {
  const { role, roleLoading } = useUserRole();

  if (roleLoading) {
    return <div></div>;
  }

  switch (role) {
    case 'user':
      return <UserProfile></UserProfile>
    case 'member':
      return <MemberProfile />;
    case 'admin':
      return <AdminProfile />;
    default:
      return <Forbidden></Forbidden>
  }
};

export default ProfilePage;