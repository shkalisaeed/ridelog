import React, { useState } from "react";
import { useAddTransaction } from "../../hooks/useAddTransaction";
import { useAddVehicle } from "../../hooks/useAddVehicle";
import { useGetUserInfo } from "../../hooks/useGetUserInfo";
import "./styles.css";
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase-config";
import { useNavigate } from "react-router-dom";
import logo from "./logo_r.png"; 
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

   const [description, setDescription] = useState("");
   const [amount, setAmount] = useState("");
   const [transactionType, setTransactionType] = useState("expense");
   //const [expenseType, setExpenseType] = useState("Gas");
   
   const handleMakeChange = (e) => {
      setMake(e.target.value);
   };

   
   const handleModelChange = (e) => {
      setModel(e.target.value);
   };

   const handleYearChange = (e) => {
      setYear(e.target.value);
   };

   const handleRegoChange = (e) => {
      setRego(e.target.value);
   };

   const handleDescriptionChange = (e) => {
      setDescription(e.target.value);
   };

   const handleAmountChange = (e) => {
      setAmount(e.target.value);
   };

   const handleTransactionTypeChange = (e) => {
      setTransactionType(e.target.value);
   };

   const handleVehicleSubmit = (e) => {
      e.preventDefault();
      // Handle vehicle submission here
      console.log(`Make: ${make}, Model: ${model}, Year: ${year}`);
   };


   const handleTransactionSubmit = (e) => {
      e.preventDefault();
      // Handle transaction submission here
      console.log(`Description: ${description}, Amount: ${amount}, Type: ${transactionType}`);
   };

//TESTING Add Vehicle
   const onSubmit2 = async (e) => {
      e.preventDefault()
      addVehicle({ make: "Toyota", model: "Axio", year: "2015", rego: "ABC123" })
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
      addTransaction({ description: "Gas BP", transactionAmount: 100, transactionType: "Fuel" })
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
                  <input
                     type="text"
                     placeholder="Make"
                     value={make}
                     onChange={handleMakeChange}
                     required
                  />
                  <input
                     type="text"
                     placeholder="Model"
                     value={model}
                     onChange={handleModelChange}
                     required
                  />
                  <label htmlFor="year">Year:</label>
                  <select id="year" value={year} onChange={handleYearChange}>
                     {Array.from({ length: new Date().getFullYear() - 1980 + 1 }, (_, i) => 1980 + i).map((year) => (
                        <option key={year} value={year}>
                           {year}
                        </option>
                     ))}
                  </select>
                  <input
                     type="text"
                     placeholder="Rego"
                     value={rego}
                     onChange={handleRegoChange}
                     required
                  />
                  <button type="submit">Add Vehicle </button>
               </form>
            </div>
            <div className="add-transaction" onSubmit={onSubmit}>
               <h3>Add Expense</h3>
               <form onSubmit={handleTransactionSubmit}>
                  <input
                     type="text"
                     placeholder="Description"
                     value={description}
                     onChange={handleDescriptionChange}
                     required
                  />
                  <input
                     type="number"
                     placeholder="Amount"
                     value={amount}
                     onChange={handleAmountChange}
                     required
                  />
           
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
