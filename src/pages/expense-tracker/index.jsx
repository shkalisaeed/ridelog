import React, { useState, useEffect } from "react";
import { useAddTransaction } from "../../hooks/useAddTransaction";
import { useAddVehicle } from "../../hooks/useAddVehicle";
import { useGetUserInfo } from "../../hooks/useGetUserInfo";
import { useGetVehicles } from "../../hooks/useGetVehicles";
import "./styles.css";
import "./global.css";
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase-config";
import { useNavigate } from "react-router-dom";
import logo from "./logo_r_new.png";
import defaultprofilepic from "./user-icon.png"
import Chart from 'chart.js/auto'

//---FUNCTIONS START HERE--- 

export const ExpenseTracker = () => {

   const { addTransaction } = useAddTransaction();
   const { addVehicle } = useAddVehicle();
   const { name, profilePhoto } = useGetUserInfo();
   const navigate = useNavigate();

   const [isVehicleAdded, setIsVehicleAdded] = useState(false);
   const [isTransactionAdded, setIsTransactionAdded] = useState(false);
   const [isDisplayingFleet, setIsDisplayingFleet] = useState(false);

   const [make, setMake] = useState("");
   const [model, setModel] = useState("");
   const [year, setYear] = useState("");
   const [rego, setRego] = useState("");
   const [color, setColor] = useState("");
   const [fuelType, setFuelType] = useState("");
   const [marketValue, setMarketValue] = useState("");
   const [updatedAt, setUpdatedAt] = useState("");
   


   const { vehicles, loadingVehicles } = useGetVehicles(); // Include loadingVehicles from useGetVehicles


   const [odo_reading, set_Odo_Reading] = useState("");
   const [tank_size, setTank_Size] = useState("");
   const [insurance_provider, set_Insurance_Provider] = useState("");
   const [insurance_type, set_Insurance_Type] = useState("");


   const [transactionType, setTransactionType] = useState("");
   const [transactionAmount, setAmount] = useState(0.0);
   const [description, setDescription] = useState("");
   const [transactionDate, setTransactionDate] = useState("");
   const [selectedVehicleRego, setSelectedVehicleRego] = useState("");


   //const [expenseType, setExpenseType] = useState("Gas");

   const handleTransactionSubmit = (e) => {
      e.preventDefault();
      // Handle transaction submission here
      console.log(`Description: ${description}, Amount: ${transactionAmount}, Type: ${transactionType}, , Date: ${transactionDate} `);
   };

   const handleDisplayFleet = () => {
      setIsDisplayingFleet(true);
   };

   const handleCloseFleet = () => {
      setIsDisplayingFleet(false);
   };

   //TESTING Add Vehicle
   const onSubmit2 = async (e) => {
      e.preventDefault()
      addVehicle({ make, model, year, rego, odo_reading, tank_size, insurance_provider, insurance_type, color, fuelType, marketValue, updatedAt })
      setIsVehicleAdded(true);

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
      e.preventDefault();
      if (!selectedVehicleRego) {
         // Display an error message or handle the case where no vehicle is selected.
         return;
      }

      addTransaction({
         rego: selectedVehicleRego,  // Add the selected vehicle's rego
         transactionType,
         transactionAmount,
         description,
         transactionDate
      });

      setIsTransactionAdded(true);
   };

   useEffect(() => {
      // Function to render both the pie chart and the bar chart
      const renderCharts = () => {
        // Pie Chart
        const ctxPieChart = document.getElementById('pieChart').getContext('2d');
    
        // Destroy existing pie chart if it exists
        if (window.myPieChart) {
          window.myPieChart.destroy();
        }
    
        // Sample data for the pie chart (replace this with your actual data)
        const pieChartData = {
          labels: ['Fuel', 'Maintenance', 'Insurance', 'Registration', 'Other'],
          datasets: [{
            data: [20, 15, 25, 10, 30], // Replace with your actual data
            backgroundColor: ['#ff9999', '#66b3ff', '#99ff99', '#ffcc99', '#c2c2f0'],
          }],
        };

        const pieChartOptions = {
         plugins: {
           legend: {
             position: 'right', // Set legend position to left
             align: 'center',  // Center the legend horizontally
           },
         },
       };
    
        window.myPieChart = new Chart(ctxPieChart, {
          type: 'pie',
          data: pieChartData,
          options: pieChartOptions,
        });
    
        // Bar Chart
        const ctxBarChart = document.getElementById('barChart').getContext('2d');
    
        // Destroy existing bar chart if it exists
        if (window.myBarChart) {
          window.myBarChart.destroy();
        }
    
        // Sample data for the bar chart (replace this with your actual data)
        const barChartData = {
          labels: ['Month 1', 'Month 2', 'Month 3', 'Month 4', 'Month 5', 'Month 6'],
          datasets: [{
            label: 'Spending in the past 6 months',
            data: [50, 30, 20, 40, 60, 25], // Replace with your actual data
            backgroundColor: '#66b3ff',
            borderColor: '#4e73df',
            borderWidth: 1,
          }],
        };
    
        const barChartOptions = {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        };
    
        window.myBarChart = new Chart(ctxBarChart, {
          type: 'bar',
          data: barChartData,
          options: barChartOptions,
        });
      };
    
      // Call the renderCharts function
      renderCharts();
    
      // Cleanup function to destroy the charts when the component is unmounted
      return () => {
        if (window.myPieChart) {
          window.myPieChart.destroy();
        }
    
        if (window.myBarChart) {
          window.myBarChart.destroy();
        }
      };
    }, []); // Run the effect only once when the component mounts
    

   //---END OF FUNCTIONS---
   return (
      <>
         <div className="expense-tracker">
            <header>
               <nav>
                  <ul className="top-nav">
                     <li><a href="#">FAQs</a></li>
                     <li><a href="#">Our Mission</a></li>
                     <li><a href="#">Team</a></li>
                  </ul>
               </nav>

            </header>

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
                     <label htmlFor="insurance">Car Make*:</label>
                     <input
                        type="text"
                        placeholder="Make"
                        required
                        onChange={(e) => setMake(e.target.value)}

                     />


                     <label htmlFor="insurance">Car Model*:</label>
                     <input
                        type="text"
                        placeholder="Model"
                        required
                        onChange={(e) => setModel(e.target.value)}

                     />


                     <label htmlFor="insurance">Year*:</label>
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


                     <label htmlFor="rego">Car Rego*:</label>
                     <input
                        type="text"
                        placeholder="Registration #"
                        required
                        onChange={(e) => setRego(e.target.value)}
                     />

                  </div>
                  <div className="form-group">
                     <label htmlFor="odo">Odometer (KM)*:</label>
                     <input
                        type="number"
                        placeholder="ODO Reading"
                        required
                        onChange={(e) => set_Odo_Reading(e.target.value)}
                     />


                     <label htmlFor="tanksize">Tank(L)*:</label>
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


                     <label htmlFor="insurance">Insurance*:</label>
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

                     <label htmlFor="insurancetype">Type Cover*:</label>
                     <select
                        type="text"
                        placeholder="Inurance Type"
                        required
                        onChange={(e) => set_Insurance_Type(e.target.value)}
                     >
                        <option value="">Select cover type</option>
                        <option value="Comprehensive">Comprehensive</option>
                        <option value="Third Party">Third Party</option>
                        <option value="No Cover">No Cover</option>
                     </select>

                  </div>

                  <div className="form-group">
                     <label htmlFor="color">Color:</label>
                     <select
                        className="color-dropdown"
                        onChange={(e) => setColor(e.target.value)}
                     >
                        <option value="">Select Color</option>
                        <option value="White" style={{ backgroundColor: "White" }}>
                           White
                        </option>
                        <option value="Black" style={{ backgroundColor: "Black" }}>
                           Black
                        </option>
                        <option value="Red" style={{ backgroundColor: "Red" }}>
                           Red
                        </option>
                        <option value="Blue" style={{ backgroundColor: "Blue" }}>
                           Blue
                        </option>
                        <option value="Silver" style={{ backgroundColor: "Silver" }}>
                           Silver
                        </option>
                        <option value="Burgundy" style={{ backgroundColor: "maroon" }}>
                           Burgundy
                        </option>
                        <option value="Gray" style={{ backgroundColor: "Gray" }}>
                           Gray
                        </option>
                        <option value="Orange" style={{ backgroundColor: "Orange" }}>
                           Orange
                        </option>
                     </select>

                     <label htmlFor="insurancetype">Type Fuel:</label>
                     <select
                        type="text"
                        placeholder="Fuel"
                        required
                        onChange={(e) => setFuelType(e.target.value)}
                     >
                        <option value="Petrol">Petrol</option>
                        <option value="">Diesel</option>
                        <option value="">LPG</option>
                     </select>

                     <label htmlFor="Expense">Market Value:</label>
                     <input
                        type="number"
                        placeholder="Value $"

                        onChange={(e) => setMarketValue(e.target.value)}
                     />

                     <label htmlFor="Update">Updated At:</label>
                     <input
                        type="date"
                        placeholder="Date"

                        onChange={(e) => setUpdatedAt(e.target.value)}
                     />
                  </div>
                  <button type="submit" id="submit-button">Add Vehicle</button>
                  <button type="button" id="display-button" onClick={handleDisplayFleet}>
                     Display Fleet
                  </button>

                  <div id="notification" className="notification">
                     {isVehicleAdded && <p>Vehicle Added Successfully</p>}
                  </div>

               </form>
            </div>
            <div className="add-transaction" onSubmit={onSubmit}>
               <h3>Add Expense</h3>
               <form onSubmit={handleTransactionSubmit}>
                  <div className="form-group">
                     <label htmlFor="Expense">Vehicle Rego*:</label>
                     {loadingVehicles ? (
                        <p>Loading vehicles...</p>
                     ) : (
                        <select
                           required
                           onChange={(e) => setSelectedVehicleRego(e.target.value)}
                        >
                           <option value="">Select a vehicle</option>
                           {vehicles.length > 1 && (
                              // Render options only if there are more than two vehicles
                              vehicles.map((vehicle) => (
                                 <option key={vehicle.rego} value={vehicle.rego}>
                                    {vehicle.make} {vehicle.model} ({vehicle.rego})
                                 </option>
                              ))
                           )}
                        </select>
                     )}

                     <label htmlFor="Expense">Type*:</label>
                     <select
                        required
                        onChange={(e) => setTransactionType(e.target.value)}
                     >
                        <option value="">Select an expense type</option>
                        <option value="Fuel">Fuel</option>
                        <option value="Maintenance">Maintenance</option>
                        <option value="Insurance">Insurance</option>
                        <option value="Registration">Registration</option>
                        <option value="Other">Other</option>
                     </select>
                     <label htmlFor="Expense">Amount*:</label>
                     <input
                        type="number"
                        placeholder="Amount $"
                        step="any" // Allow any decimal input
                        required
                        onChange={(e) => setAmount(e.target.value)}
                     />


                     <label htmlFor="Expense">Description:</label>
                     <textarea
                        placeholder=""

                        onChange={(e) => setDescription(e.target.value)}
                     ></textarea>
                     <label> Date*:</label>
                     <input
                        type="date"
                        required

                        onChange={(e) => setTransactionDate(e.target.value)}
                     />

                  </div>
                  <button type="submit" id="submit-button">Add Expense</button>
                  <div id="notification" className="notification">
                     {isTransactionAdded && <p>Transaction Added Successfully</p>}
                  </div>
               </form>
            </div>
         </div>

         <div className="form-group-transaction">
            <div>
               <h3>Recent Expenses</h3>
               <div className="row">
                  <div className="column">Fuel</div>
                  <div className="column">Insurance</div>
                  <div className="column">Maintenance</div>
                  <div className="column">Other</div>
               </div>

               <div className="chartRow">
                  <div className="chartColumn">Expense Breakdown by Category
                     <canvas id="pieChart"></canvas>
                  </div>
                  <div className="chartColumn">Spending in the past 6M
                     <canvas id="barChart"></canvas>
                  </div>
               </div>

               <div className="row">
                  <div className="column">Spending by Vehicle</div>
               </div>
            </div>
            { }
            {isDisplayingFleet && (
               <div className="fleet-modal">
                  <div className="fleet-modal-content">

                     <h3>Fleet Information</h3>
                     <span className="close" onClick={handleCloseFleet}>click here to close</span>
                     <div className="center-table">
                        <table>
                           <thead>
                              <tr>
                                 <th>Make</th>
                                 <th>Model</th>
                                 <th>Registration</th>
                              </tr>
                           </thead>
                           <tbody>
                              {vehicles.map((vehicle) => (
                                 <tr key={vehicle.rego}>
                                    <td>{vehicle.make}</td>
                                    <td>{vehicle.model}</td>
                                    <td>{vehicle.rego}</td>
                                 </tr>
                              ))}
                           </tbody>
                        </table>
                     </div>
                  </div>
               </div>

            )}
         </div>
         <footer className="footer">
            {/* Your footer content goes here */}
            <p>&copy; 2023 Ridelog. All rights reserved.</p>
         </footer>

      </>
   );
};
