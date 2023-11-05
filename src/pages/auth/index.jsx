import { auth, provider } from "../../config/firebase-config";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import "./styles.css";
import logo from "./logo_r.png"; // Import the logo image

export const Auth = () => {
    const navigate = useNavigate();

    const signInWithGoogle = async () => {
        try {
            const results = await signInWithPopup(auth, provider);
            //localStorage.setItem("auth")
            //getting details of the user logged in
            const authInfo = {
                userID: results.user.uid,
                name: results.user.displayName,
                profilePhoto: results.user.photoURL,
                isAuth: true,
            };
            localStorage.setItem("auth", JSON.stringify(authInfo)); //storing info locally in object
            navigate("/expense-tracker");
            console.log(results); //for testing purposes
        } catch (error) {
            if (error.code === "auth/popup-closed-by-user") {
                // Handle the case where the user closed the popup
                console.log("Sign-in popup was closed by the user.");
                // You can display a user-friendly message here.
            } else {
                // Handle other authentication errors
                console.error("An error occurred during sign-in:", error);
                // You can display an error message or take other actions as needed.
            }
        }
    };

    return (
        <div className="login-page">
            <img src={logo} alt="RIDELOG Logo" style={{ width: "50%" }} /> {/* Apply 50% width to reduce size */}
            <h1>RIDELOG Vehicle Expense Tracker</h1>
            <p>Sign in with a Google account</p>
            <button onClick={signInWithGoogle}>Sign In</button>
        </div>
    );
};
