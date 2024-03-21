import React from "react";

const Header = () => {
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
          <h1 className="text-white text-3xl font-extrabold">
            USER MANAGEMENT
          </h1>
          <ul className="flex gap-6 text-white">
            <li className="font-bold transition duration-300 hover:bg-white hover:text-red-500 hover:rounded-full hover:px-2 cursor-pointer">
              Home
            </li>
            <li className="font-bold transition duration-300 hover:bg-white hover:text-red-500 hover:rounded-full hover:px-2 cursor-pointer">
              About
            </li>
            <li className="font-bold transition duration-300 hover:bg-white hover:text-red-500 hover:rounded-full hover:px-2 cursor-pointer">
              Sign In
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Header;
