import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useNavigate,
} from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import Header from "./components/Header";
import AdminPrivateRoute from "./components/AdminPrivateRoute";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { signInSuccess } from "./redux/userSlice";
import AdminPanel from "./pages/AdminPanel";
import UserPrivateRoute from "./components/UserPrivateRoute";
axios.defaults.withCredentials = true;
function App() {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user.currentUser);
  const navigate = useNavigate();
  console.log(userData, ",lfjkfjfjfffrf");
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (userData) {
      if (userData.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    }
  }, [userData]);
  useEffect(() => {
    axios
      .get("http://localhost:3000/user/fetchuserdata")
      .then((response) => {
        dispatch(signInSuccess(response.data));
      })
      .catch((error) => {
        console.log("Axios Error:", error);
      });
  }, []);

  return (
    <Routes>
      <Route path="/sign-up"    element={
          !userData ? (
            <Signup />
          ) : userData.role == "admin" ? (
            <Navigate to="/admin" />
          ) : (
            <Navigate to="/" />
          )
        } />
      <Route
        path="/sign-in"
        element={
          !userData ? (
            <SignIn />
          ) : userData.role == "admin" ? (
            <Navigate to="/admin" />
          ) : (
            <Navigate to="/" />
          )
        }
      />
      <Route path="/admin" element={<AdminPrivateRoute />}>
        <Route index element={<AdminPanel />}></Route>
      </Route>
      <Route path="/" element={<UserPrivateRoute />}>
        <Route index element={<Home />}></Route>
        <Route path="profile" element={<Profile />} />
      </Route>
    </Routes>
  );
}

export default App;
