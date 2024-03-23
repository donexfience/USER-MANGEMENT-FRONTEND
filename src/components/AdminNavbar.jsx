import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { signOut } from "../redux/userSlice";
import { FaSearch, FaUserPlus, FaSignOutAlt } from "react-icons/fa";

const AdminNavbar = ({ users, setUser, setAddModalOpen, setSearch }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    const value = e.target.value.trim().toLowerCase();
    setSearchTerm(value);
    setSearch(value);
  };

  const handleLogout = () => {
    axios.get("http://localhost:3000/auth/logout").then(() => {
      dispatch(signOut());
      navigate("/sign-in");
    });
  };

  return (
    <nav className="bg-blue-600 py-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center px-4">
        <div className="text-white font-bold text-2xl">Admin Dashboard</div>
        <div className="flex items-center">
          <div className="relative">
            <input
              type="text"
              placeholder="Search users"
              value={searchTerm}
              onChange={handleSearch}
              className="px-4 py-2 rounded-full bg-gray-200 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <FaSearch className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
          </div>
          <button
            className="ml-4 flex items-center bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-700 transition-colors duration-300"
            onClick={handleLogout}
          >
            <FaSignOutAlt className="mr-2" />
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;