import React, { useState } from "react";
import { useAddTransaction } from "../../hooks/useAddTransaction";
import { useAddVehicle } from "../../hooks/useAddVehicle";
import { useGetUserInfo } from "../../hooks/useGetUserInfo";
import "./styles.css";
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase-config";
import { useNavigate } from "react-router-dom";
import logo from "./logo_r_new.png";
import defaultprofilepic from "./user-icon.png"

//---FUNCTIONS START HERE--- 

export const ExpenseTracker = () => {

   const { addTransaction } = useAddTransaction();
   const { addVehicle } = useAddVehicle();
   const { name, profilePhoto } = useGetUserInfo();
   const navigate = useNavigate();


   const [make, setMake] = useState("");
   const [model, setModel] = useState("");
   const [year, setYear] = useState("");
   const [rego, setRego] = useState("");


   const [odo_reading, set_Odo_Reading] = useState("");
   const [tank_size, setTank_Size] = useState("");
   const [insurance_provider, set_Insurance_Provider] = useState("");
   const [insurance_type, set_Insurance_Type] = useState("");


   const [description, setDescription] = useState("");
   const [transactionAmount, setAmount] = useState(0);
   const [transactionType, setTransactionType] = useState("expense");
   //const [expenseType, setExpenseType] = useState("Gas");




   const handleTransactionSubmit = (e) => {
      e.preventDefault();
      // Handle transaction submission here
      console.log(`Description: ${description}, Amount: ${transactionAmount}, Type: ${transactionType}`);
   };

   //TESTING Add Vehicle
   const onSubmit2 = async (e) => {
      e.preventDefault()
      addVehicle({ make, model, year, rego, odo_reading, tank_size, insurance_provider, insurance_type })
   };

   //sign out function for user
   const signUserOut = async () => {
      try {
         await signOut(auth)
         localStorage.clear();
         navigate("/");
      } catch (err) {
         console.error(err)
      }
   };

   //TESTING Add Expense   
   const onSubmit = async (e) => {
      e.preventDefault()
      addTransaction({
         description,
         transactionAmount,
         transactionType
      })
   };


   //---END OF FUNCTIONS---
   return (
      <>
         <div className="expense-tracker">

            <div className="profile">
               <div className="profile-photo-container">
                  {profilePhoto ? (
                     <img className="profile-photo" src={profilePhoto} alt="Profile bbPhoto" />
                  ) : (
                     <img className="profile-photo" src={defaultprofilepic} alt="Profile asdPhoto" />
                  )}
               </div>
               <button className="sign-out-button" onClick={signUserOut}>
                  Sign Out
               </button>
            </div>


            <h2>
               <div className="name">
                  Welcome {name}
               </div>
            </h2>
            <div className="add-vehicle" onSubmit={onSubmit2}>
               <img src={logo} alt="RIDELOG Logo" style={{ width: "20%" }} />
               <h3>Add Vehicle</h3>
               <form >
                  <div className="form-group">
                  <label htmlFor="insurance">Car Make:</label>   
                     <input
                        type="text"
                        placeholder="Make"
                        required
                        onChange={(e) => setMake(e.target.value)}

                     />
                  </div>
                  <div className="form-group">
                  <label htmlFor="insurance">Car Model:</label>   
                     <input
                        type="text"
                        placeholder="Model"
                        required
                        onChange={(e) => setModel(e.target.value)}

                     />
                  </div>
                  <div className="form-group">
                  <label htmlFor="insurance">Year:</label>
                     <select 
                      id="year"
                      
                        required
                        onChange={(e) => setYear(e.target.value)}
                     >
                        {Array.from({ length: new Date().getFullYear() - 1980 + 1 }, (_, i) => 1980 + i).map((year) => (
                           <option key={year} value={year}>
                              {year}
                           </option>
                        ))}
                     </select>
                  </div>
                  <div className="form-group">
                     <label htmlFor="rego">Car Rego:</label>
                     <input
                        type="text"
                        placeholder="Rego"
                        required
                        onChange={(e) => setRego(e.target.value)}
                     />
                  </div>

                  <div className="form-group">
                     <label htmlFor="odo">Current Millage (KM):</label>
                     <input
                        type="number"
                        placeholder="ODO Reading"
                        required
                        onChange={(e) => set_Odo_Reading(e.target.value)}
                     />
                  </div>
                  
                  <div className="form-group">
                  <label htmlFor="tanksize">Tank Size (L):</label>
                  <select
                     required
                     onChange={(e) => setTank_Size(e.target.value)}
                  >
                     <option value="">Select Tank Size</option>
                     <option value="30">30</option>
                     <option value="35">35</option>
                     <option value="40">40</option>
                     <option value="45">45</option>
                     <option value="50">50</option>
                     <option value="55">55</option>
                     <option value="60">60</option>
                  </select>
                  </div>
                  <div className="form-group">
                     <label htmlFor="insurance">Insurance Company:</label>
                     <select
                        required
                        onChange={(e) => set_Insurance_Provider(e.target.value)}
                     >
                        <option value="">Select Company</option>
                        <option value="Allianz">Allianz</option>
                        <option value="AAMI">AAMI</option>
                        <option value="Youi">Youi</option>
                        <option value="Budget Direct">Budget Direct</option>
                        <option value="Bingle">Bingle</option>
                        <option value="RACV">RACV</option>
                        <option value="Woolworths Insurance">Woolworths Insurance</option>
                        <option value="Coles Insurance">Coles Insurance</option>
                     </select>
                  </div>
                  <div className="form-group">
                     <label htmlFor="insurancetype">Type Cover:</label>
                     <select
                        type="text"
                        placeholder="Inurance Type"
                        required
                        onChange={(e) => set_Insurance_Type(e.target.value)}
                     >
                        <option value="">Select cover type</option>
                        <option value="Comprehensive">Comprehensive</option>
                        <option value="Third Party">Third Party</option>
                     </select>
                  </div>
                  <div className="form-group-submit">
                  <button type="submit">Add Vehicle </button>
                  </div>
               </form>
            </div>
            <div className="add-transaction" onSubmit={onSubmit}>
               <h3>Add Expense</h3>
               <form onSubmit={handleTransactionSubmit}>
                  <div className="form-group">
                     <label htmlFor="Expense">Type Expense:</label>
                     <select
                        required
                        onChange={(e) => setDescription(e.target.value)}
                     >

                        <option value="">Select an expense type</option>
                        <option value="Fuel">Fuel</option>
                        <option value="Maintenance">Maintenance</option>
                        <option value="Insurance">Insurance</option>
                        <option value="Registration">Registration</option>
                        <option value="Other">Other</option>

                     </select>
                  </div>
                  <div className="form-group">
                     <input
                        type="number"
                        placeholder="Amount"

                        required
                        onChange={(e) => setAmount(e.target.value)}

                     />
                  </div>

                  <button type="submit">Add Expense</button>
               </form>
            </div>
         </div>


         <div className="transactions">
            <h3>Recent Expenses</h3>
         </div>
      </>
   );
};
