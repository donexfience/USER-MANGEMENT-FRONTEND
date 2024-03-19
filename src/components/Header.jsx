import React from "react";

const Header = () => {
  return (
    <div className="bg-slate-500">
      <div className="flex justify-between items-center max-w-6xl mx-auto py-4 px-8">
        <h1 className="text-white text-2xl font-bold">Auth app</h1>
        <ul className="flex gap-6 text-white">
          <li className="transition duration-300 hover:text-gray-300 cursor-pointer">Home</li>
          <li className="transition duration-300 hover:text-gray-300 cursor-pointer">About</li>
          <li className="transition duration-300 hover:text-gray-300 cursor-pointer">Sign In</li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
