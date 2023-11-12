import { auth, provider } from "../../config/firebase-config";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import {createUserWithEmailAndPassword, onAuthStateChanged} from "firebase/auth"
import "./styles.css";
import logo from "./logo_r_new.png"; // Import the logo image
import { updateProfile } from "firebase/auth";

import { useState, useEffect } from "react";

export const Auth = () => {
    const navigate = useNavigate();

    const [registerEmail, setRegisterEmail] = useState("");
    const [registerName, setRegisterName] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [user, setUser] = useState({});


    const register = async () => {
        if (validateEmail(registerEmail) && validatePassword(registerPassword)) {
            try {
                const userdata = await createUserWithEmailAndPassword(auth, registerEmail, registerPassword);     
               // Set the user's name in the Firebase user object
                await updateProfile(userdata.user, {
                    displayName: registerName,
                });

            const authInfo2 = {
                userID: userdata.user.uid,
                name: registerName, // Using the captured name
                profilePhoto: userdata.user.photoURL,
                isAuth: true,
            };


            localStorage.setItem("auth", JSON.stringify(authInfo2)); //storing info locally in object
            navigate("/expense-tracker");
                
              //  navigate("/expense-tracker");
            
                console.log(userdata);
            }
            
             catch (error) {
                console.log(error.message);
            }
        } else {
            // Provide feedback to the user about email and password requirements.
            alert("Please enter a valid email address and a password with a minimum of 6 characters.");
        }
    };

    const login = async () => {
        if (validateEmail(loginEmail) && validatePassword(loginPassword)) {
            try {
                const user = await signInWithEmailAndPassword(auth, loginEmail, loginPassword);


                const authInfo3 = {
                    userID: user.user.uid,
                    name: user.displayName,
                    profilePhoto: user.photoURL,
                    isAuth: true,
                };
    
    
                localStorage.setItem("auth", JSON.stringify(authInfo3)); //storing info locally in object
                    navigate("/expense-tracker");
                console.log(user);
            } catch (error) {
                console.log(error.message);
            }
        } else {
            // Provide feedback to the user about email and password requirements.
            alert("Please enter a valid email address and a password with a minimum of 6 characters.");
        }
    };

    const validateEmail = (email) => {
        // Use a simple regular expression to check for the presence of '@' and '.com'.
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const validatePassword = (password) => {
        return password.length >= 6;
    };

    const logout = async () => {
        // Implement logout logic if needed.
    };
   


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

            
            <img src={logo} alt="RIDELOG Logo" style={{ width: "50%" }} />
                



            <div className="login-data">
           

            <div>
                <h3>Vehicle Expense Tracker</h3>
                <h4>Login</h4>
                <input placeholder="Email.."
                    onChange={(event) => {
                        setLoginEmail(event.target.value);
                    }}
                />
                <input 
                type="password"
                placeholder="Password.."
                onChange={(event) => {
                        setLoginPassword(event.target.value);
                    }}
                />
                <button onClick={login}>Sign In</button>  
            </div>
            <p>Or</p>
             
            <button onClick={signInWithGoogle}>Sign in with Google</button>
            
            <div>
                <h4>Register User</h4>
                <input placeholder="Name.."
                    onChange={(event) => {
                        setRegisterName(event.target.value);
                    }}
                />
                
                <input placeholder="Email.."
                    onChange={(event) => {
                        setRegisterEmail(event.target.value);
                    }}
                />
                <input 
                 type="password"
                 placeholder="Password.."
                 onChange={(event) => {
                    setRegisterPassword(event.target.value);
                    }}
                />
                <button onClick={register}>Create User</button>
            </div>


           
        </div>
    </div>
    );
};
