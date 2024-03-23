import React from 'react';
import Header from '../components/Header';
import { useSelector } from 'react-redux';


const Home = () => {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header />
      <div className="container mx-auto px-4 py-8 flex-grow">
        <div className="flex items-center mb-8">
          <img
            src={currentUser?.profilePicture || '/default-avatar.png'}
            alt="User Avatar"
            className="w-12 h-12 rounded-full mr-4"
          />
          <h2 className="text-2xl font-semibold text-gray-800">
            Welcome, {currentUser?.username || 'User'}!
          </h2>
        </div>
        <h1 className="text-4xl font-bold text-gray-800 mb-6">User Management</h1>
        <p className="text-lg text-gray-600 mb-4">
          Welcome to the user management section! Here, you can easily manage and maintain your organization's user accounts.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Add New Users</h2>
            <p className="text-gray-600">
              Quickly add new users to your organization by providing their basic information and assigning roles and permissions.
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Edit User Profiles</h2>
            <p className="text-gray-600">
              Update user profiles, including personal details, contact information, and account settings, with just a few clicks.
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Manage User Roles</h2>
            <p className="text-gray-600">
              Assign or modify user roles and permissions to ensure proper access control and maintain data security.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;