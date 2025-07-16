import React from 'react';
import useAuth from '../../hooks/useAuth';

const MemberDash = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-[80vh] flex items-center justify-center ">
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-xl w-full text-center">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
          Welcome, {user?.displayName || "Member"}!
        </h1>
        <p className="text-gray-600 text-lg mb-6">
          You are logged in as a member. From here, you can check announcements, make payments, manage your payments, and update your profile.
        </p>
      </div>
    </div>
  );
};

export default MemberDash;
