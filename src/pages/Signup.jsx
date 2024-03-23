import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import {
  isEmpty,
  isEmailValid,
  isPasswordValid,
  passwordcheck,
} from "../../helper/validation.js";

const Signup = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [usernameError, setUsernameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();

  const handlechange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset error states
    setUsernameError(false);
    setEmailError(false);
    setPasswordError(false);
    setConfirmPasswordError(false);
    setError(false);

    // Perform form validation
    if (isEmpty(formData.username)) {
      setUsernameError(true);
      setError(true);
    }
    if (isEmpty(formData.email) || isEmailValid(formData.email)) {
      setEmailError(true);
      setError(true);
    }
    if (isEmpty(formData.password) || isPasswordValid(formData.password)) {
      setPasswordError(true);
      setError(true);
    }
    if (
      isEmpty(formData.confirmPassword) ||
      passwordcheck(formData.password, formData.confirmPassword)
    ) {
      setConfirmPasswordError(true);
      setError(true);
    }

    // Check if there's any error
    if (error) {
      return;
    } else {
      try {
        setLoading(true);
        setError(false);
        console.log("fetch sending..");
        const res = await fetch("http://localhost:3000/auth/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }).then((res) => {
          console.log(res, "dataaaaaaa");
          if (res.status == "201") {
            navigate("/");
          }
        });
        console.log(data, "from backend");
        setLoading(false);
        if (data.success === false) {
          setError(true);
          return;
        }
      } catch (error) {
        setLoading(false);
        setError(true);
      }
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
          Sign Up
        </h1>
        <form className="flex flex-col gap-4 p-12" onSubmit={handleSubmit}>
          <input
            className={`bg-blue-100 p-3 rounded-lg placeholder-blue-600 ${
              usernameError ? "border-red-500" : ""
            }`}
            type="text"
            placeholder="Username"
            id="username"
            value={formData.username}
            onChange={handlechange}
          />
          {usernameError && (
            <p className="text-red-500 text-sm">Username cannot be empty.</p>
          )}
          <input
            className={`bg-blue-100 p-3 rounded-lg placeholder-blue-600 ${
              emailError ? "border-red-500" : ""
            }`}
            type="email"
            placeholder="Email"
            id="email"
            value={formData.email}
            onChange={handlechange}
          />
          {emailError && (
            <p className="text-red-500 text-sm">Invalid email format.</p>
          )}
          <input
            className={`bg-blue-100 p-3 rounded-lg placeholder-blue-600 ${
              passwordError ? "border-red-500" : ""
            }`}
            type="password"
            placeholder="Password"
            onChange={handlechange}
            value={formData.password}
            id="password"
          />
          {passwordError && (
            <p className="text-red-500 text-sm">
              Password must meet the criteria.
            </p>
          )}
          <input
            className={`bg-blue-100 p-3 rounded-lg placeholder-blue-600 ${
              confirmPasswordError ? "border-red-500" : ""
            }`}
            type="password"
            placeholder="Confirm Password"
            onChange={handlechange}
            value={formData.confirmPassword}
            id="confirmPassword"
          />
          {confirmPasswordError && (
            <p className="text-red-500 text-sm">Passwords do not match.</p>
          )}
          {error && (
            <p className="text-red-500 text-sm mt-2">
              Error occurred while signing up. Please try again.
            </p>
          )}
          <button
            disabled={loading}
            className="bg-blue-600 text-white p-3 rounded-lg uppercase hover:bg-blue-700 disabled:opacity-80"
          >
            {loading ? (
              <div className="loading-icon">
                <AiOutlineLoading3Quarters className="icon" />
              </div>
            ) : (
              "Sign Up"
            )}
          </button>
        </form>
        <div className="mt-5 flex justify-between">
          <p>Have an account?</p>
          <Link to="/sign-in" className="text-blue-500">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
