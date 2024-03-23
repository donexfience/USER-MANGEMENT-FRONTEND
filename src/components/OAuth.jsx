import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { app } from "../../firebase.js";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../redux/userSlice.js";
import { useNavigate } from "react-router-dom";

export default function OAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider);
      const userData = {
        name: result.user.displayName,
        email: result.user.email,
        photo: result.user.photoURL,
      };
      const response = await fetch("http://localhost:3000/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      console.log("+++++++++++++++++++++++", response);
      if (response.ok) {
        const data = await response.json();
        console.log("User data from server:", data);

        dispatch(signInSuccess(data));

        navigate("/");
      } else {
        // console.error("Failed to authenticate with Google:", response.statusText);
      }
    } catch (error) {
      console.error("Could not login with Google:", error);
    }
  };

  return (
    <button
      type="button"
      onClick={handleGoogleClick}
      className="bg-red-700 text-white rounded-lg p-3 uppercase hover:opacity-95"
    >
      Continue with Google
    </button>
  );
}
