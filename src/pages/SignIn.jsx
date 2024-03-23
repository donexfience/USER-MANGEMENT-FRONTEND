import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import {
  signInStart,
  signInFailure,
  signInSuccess,
} from "../redux/userSlice.js";
import { useDispatch, useSelector } from "react-redux";
import OAuth from "../components/OAuth.jsx";
import axios from "axios";

const SignIn = () => {
  const { loading, error } = useSelector((state) => state.user);
  console.log("+++++++++++++++++++++++++++++======", error);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handlechange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await axios.post(
        "http://localhost:3000/auth/login",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      // const data = await res.json();
      console.log(res, "this is data.....");
      const data = res.data
      if (!res.data.status) {
        dispatch(signInFailure(data.error));
        return;
      }
      console.log("login data ", data);
      dispatch(signInSuccess(data));
      navigate("/");
    } catch (error) {
      dispatch(signInFailure(error));
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage:
          'url("https://www.hostinger.com/tutorials/wp-content/uploads/sites/2/2019/03/mysql-show-users-1.jpg")',
      }}
    >
      <div className="max-w-2xl bg-white bg-opacity-60 rounded-lg shadow-md p-12">
        <h1 className="text-3xl text-center font-semibold my-7 text-blue-600">
          Sign In
        </h1>
        <form className="flex flex-col gap-4 p-12" onSubmit={handleSubmit}>
          <input
            className="bg-blue-100 p-3 rounded-lg placeholder-blue-600"
            type="email"
            placeholder="Email"
            id="email"
            onChange={handlechange}
          />
          <input
            className="bg-blue-100 p-3 rounded-lg placeholder-blue-600"
            type="password"
            placeholder="Password"
            onChange={handlechange}
            id="password"
          />
          {/* {error && (
            <p className="text-red-500 text-sm mt-2">
              {error || "An error occurred while signing in. Please try again."}
            </p>
          )} */}

          <OAuth />
          <button
            disabled={loading}
            className="bg-blue-600 text-white p-3 rounded-lg uppercase hover:bg-blue-700 disabled:opacity-80"
          >
            {loading ? (
              <div className="loading-icon">
                <AiOutlineLoading3Quarters className="icon" />
              </div>
            ) : (
              "Sign In"
            )}
          </button>
        </form>
        <div className="mt-5 flex justify-between">
          <p>Don't have an account?</p>
          <Link to="/sign-up" className="text-blue-500">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
