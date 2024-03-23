import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <>
      {/* Original Header */}

      {/* Colored Header with Different Font and Logo */}
      <div className="bg-blue-500 w-full">
        <div className="flex justify-between items-center max-w-6xl mx-auto py-4 px-8">
          <div>
            <img
              src="https://www.pngitem.com/pimgs/m/22-220721_circled-user-male-type-user-colorful-icon-png.png"
              alt="Logo"
              className="h-12 w-auto"
            />
          </div>
          <Link to="/">
            <h1 className="text-white text-3xl font-extrabold">
              USER MANAGEMENT
            </h1>
          </Link>
          <ul className="flex gap-6 text-white items-center">
            <Link to='/'>
              <li className="font-bold transition duration-300 hover:bg-white hover:text-red-500 hover:rounded-full hover:px-2 cursor-pointer">
                Home
              </li>
            </Link>
            <Link to='/about'>
              <li className="font-bold transition duration-300 hover:bg-white hover:text-red-500 hover:rounded-full hover:px-2 cursor-pointer">
                About
              </li>
            </Link>
            <Link to='/profile'>
              {currentUser ? (
                <img src={currentUser.profilePicture} alt="profil" className="h-12 w-12 rounded-full object-cover"/>
              ) : (
                <li className="font-bold transition duration-300 hover:bg-white hover:text-red-500 hover:rounded-full hover:px-2 cursor-pointer">SignIn</li>
              )}
            </Link>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Header;
