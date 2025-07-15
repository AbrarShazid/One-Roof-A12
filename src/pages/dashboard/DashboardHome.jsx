import React from 'react';
import useUserRole from '../../hooks/useUserRole';
import Loading from '../../Components/Loading';
import UserDash from "./UserDash"
import MemberDash from "./MemberDash"
import AdminDash from "./AdminDash"
import Forbidden from "../Forbidden"





const DashboardHome = () => {
    const { role, roleLoading } = useUserRole();

    if (roleLoading) {
        return <div></div>
    }

    if(role === 'user'){
        return <UserDash></UserDash>
    }
    else if(role === 'member'){
        return <MemberDash></MemberDash>
    }
    else if(role ==='admin'){
        return <AdminDash></AdminDash>
    }
    else {
        return <Forbidden></Forbidden>
    }
};

export default DashboardHome;