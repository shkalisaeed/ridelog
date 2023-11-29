import React, { useState, useEffect, useRef } from "react";
import { useAddTransaction } from "../../hooks/useAddTransaction";
import { useAddVehicle } from "../../hooks/useAddVehicle";
import { useGetUserInfo } from "../../hooks/useGetUserInfo";
import { useGetVehicles } from "../../hooks/useGetVehicles";
import { useGetTransactions } from "../../hooks/useGetTransactions";
import "./styles.css";
import "./global.css";
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase-config";
import { Link, useNavigate } from "react-router-dom";
import logo from "./logo_r_new.png";
import defaultprofilepic from "./user-icon.png"
import { setUserId } from "firebase/analytics";
import Chart from 'chart.js/auto';


//---FUNCTIONS START HERE--- 

export const ExpenseTracker = () => {

   const { addTransaction } = useAddTransaction();
   const { transactions } = useGetTransactions();

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
   const [selectedVehicleExpenses, setSelectedVehicleExpenses] = useState([]);
   const { vehicles, loadingVehicles } = useGetVehicles(); // Include loadingVehicles from useGetVehicles
   const [isRecentExpensesVisible, setIsRecentExpensesVisible] = useState(true);


   const [odo_reading, set_Odo_Reading] = useState("");
   const [tank_size, setTank_Size] = useState("");
   const [insurance_provider, set_Insurance_Provider] = useState("");
   const [insurance_type, set_Insurance_Type] = useState("");


   const [transactionType, setTransactionType] = useState("");
   const [transactionAmount, setAmount] = useState(0.0);
   const [description, setDescription] = useState("");
   const [transactionDate, setTransactionDate] = useState("");
   const [selectedVehicleRego, setSelectedVehicleRego] = useState("");
   const [totalExpenses, setTotalExpenses] = useState([]);
   const [selectedDate, setSelectedDate] = useState("");
   const [selectedVehicleName, setSelectedVehicleName] = useState(""); 


   //const [expenseType, setExpenseType] = useState("Gas");

   const handleTransactionSubmit = (e) => {
      e.preventDefault();

      // Handle transaction submission here
      console.log(`Description: ${description}, Amount: ${transactionAmount}, Type: ${transactionType}, Date: ${transactionDate}`);

      // Update selected vehicle expenses
      const newExpense = {
         transactionType,
         transactionAmount,
         transactionDate,
      };
      setSelectedVehicleExpenses([...selectedVehicleExpenses, newExpense]);
   };


   const handleDisplayFleet = () => {
      setIsDisplayingFleet(true);
   };

   const handleCloseFleet = () => {
      setIsDisplayingFleet(false);
   };

   const handleToggleRecentExpenses = () => {
      setIsRecentExpensesVisible(!isRecentExpensesVisible);
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


   // Function to update total expenses table
   const updateTotalExpensesTable = () => {
      const selectedVehicle = vehicles.find((vehicle) => vehicle.rego === selectedVehicleRego);
      if (!selectedVehicle) return;

      setSelectedVehicleName(`${selectedVehicle.make} ${selectedVehicle.model}`);
    
      const expenses = transactions.filter((transaction) => transaction.rego === selectedVehicleRego);
    
      const totalExpensesByType = {};
      expenses.forEach((expense) => {
        if (totalExpensesByType[expense.transactionType]) {
          // Type already exists, add to the existing total
          totalExpensesByType[expense.transactionType] += Number(expense.transactionAmount);
        } else {
          // Type doesn't exist, initialize the total
          totalExpensesByType[expense.transactionType] = Number(expense.transactionAmount);
        }
      });
    
      const updatedTotalExpenses = Object.entries(totalExpensesByType).map(([type, total]) => ({
        type,
        total,
      }));
    
      setTotalExpenses(updatedTotalExpenses);
    };
    

    const updatePieChart = () => {
      const selectedVehicle = vehicles.find((vehicle) => vehicle.rego === selectedVehicleRego);
      if (!selectedVehicle) return;

      const expenses = transactions.filter((transaction) => transaction.rego === selectedVehicleRego);
  
      // Update the selected vehicle's name in the pie chart title
      const chartTitle = `Expense Distribution of ${selectedVehicle.make} ${selectedVehicle.model}`;
      
      const ctx = document.getElementById('pieChart').getContext('2d');
      if (!ctx) return;
  
      // Check if there's an existing chart on the canvas
      const existingChart = Chart.getChart(ctx);
    
      // Aggregate expenses by type
      const aggregatedExpenses = expenses.reduce((acc, expense) => {
        const existingExpense = acc.find((e) => e.type === expense.transactionType);
        if (existingExpense) {
          existingExpense.total += parseFloat(expense.transactionAmount);
        } else {
          acc.push({
            type: expense.transactionType,
            total: parseFloat(expense.transactionAmount),
          });
        }
        return acc;
      }, []);
    
      if (existingChart) {
        // Update the existing chart's data
        existingChart.data.labels = aggregatedExpenses.map((expense) => expense.type);
        existingChart.data.datasets[0].data = aggregatedExpenses.map((expense) => expense.total);
    
        // Update the chart
        existingChart.update();
      } else {
        // Create a new chart if there's no existing chart
        const data = {
          labels: aggregatedExpenses.map((expense) => expense.type),
          datasets: [
            {
              data: aggregatedExpenses.map((expense) => expense.total),
              backgroundColor: [
                'rgba(106, 90, 205, 0.7)',
                'rgba(54, 162, 235, 0.7)',
                'rgba(255, 206, 86, 0.7)',
                'rgba(175, 15, 238, 0.7)',
                'rgba(153, 102, 255, 0.7)',
              ],
            },
          ],
        };
    
        const options = {
          width: 30, // Adjust the width as needed
          height: 30,
          plugins: {
            legend: {
              position: 'bottom',
            },
        
            datalabels: {
              anchor: 'center',
              align: 'center',
              formatter: (value, context) => {
                const total = data.datasets[0].data.reduce((acc, val) => acc + val, 0);
                const percentage = ((value / total) * 100).toFixed(1) + '%';
                return percentage;
              },
            },
          },
        };
    
        new Chart(ctx, {
          type: 'doughnut',
          data: data,
          options: options,
        });
      }
    };
    
//////////////////////////////////

    const updatePieChartByDate = () => {
      const selectedVehicle = vehicles.find((vehicle) => vehicle.rego === selectedVehicleRego);
      if (!selectedVehicle) return;
    
      const expenses = transactions.filter((transaction) => transaction.rego === selectedVehicleRego);
    
      const ctx = document.getElementById('pieChart2').getContext('2d');
      if (!ctx) return;
    
      // Check if there's an existing chart on the canvas
      const existingChart = Chart.getChart(ctx);
    
      // Step 1: Filter expenses based on the selected date
      const expensesOnSelectedDate = selectedDate
        ? expenses.filter((expense) => expense.transactionDate === selectedDate)
        : expenses;
    
      // Step 2: Aggregate expenses by type
      const aggregatedExpenses = expensesOnSelectedDate.reduce((acc, expense) => {
        const existingExpense = acc.find((e) => e.type === expense.transactionType);
        if (existingExpense) {
          existingExpense.total += parseFloat(expense.transactionAmount);
        } else {
          acc.push({
            type: expense.transactionType,
            total: parseFloat(expense.transactionAmount),
          });
        }
        return acc;
      }, []);
    
      if (existingChart) {
        // Update the existing chart's data
        existingChart.data.labels = aggregatedExpenses.map((expense) => expense.type);
        existingChart.data.datasets[0].data = aggregatedExpenses.map((expense) => expense.total);
    
        // Update the chart
        existingChart.update();
      } else {
        // Create a new chart if there's no existing chart
        const data = {
          labels: aggregatedExpenses.map((expense) => expense.type),
          datasets: [
            {
              data: aggregatedExpenses.map((expense) => expense.total),
              backgroundColor: [
                'rgba(106, 90, 205, 0.7)',
                'rgba(54, 162, 235, 0.7)',
                'rgba(255, 206, 86, 0.7)',
                'rgba(175, 15, 238, 0.7)',
                'rgba(153, 102, 255, 0.7)',
              ],
            },
          ],
        };
    
        const options = {
          width: 30, // Adjust the width as needed
          height: 30,
          plugins: {
            legend: {
              position: 'bottom',
            },
            title: {
              display: true,
              text: 'Vehicle Expense Distribution',
              font: {
                size: 14,
              },
            },
            datalabels: {
              anchor: 'center',
              align: 'center',
              formatter: (value, context) => {
                const total = data.datasets[0].data.reduce((acc, val) => acc + val, 0);
                const percentage = ((value / total) * 100).toFixed(1) + '%';
                return percentage;
              },
            },
          },
        };
    
        new Chart(ctx, {
          type: 'doughnut',
          data: data,
          options: options,
        });
      }
    };
    
    
    
    
    useEffect(() => {
      updatePieChartByDate();
    }, [transactions, selectedDate]);


      useEffect(() => {
         updatePieChart();
         updateTotalExpensesTable();
      }, [transactions, selectedVehicleRego, vehicles, selectedDate, selectedVehicleName]); // Include selectedDate in the dependencies

   //---END OF FUNCTIONS---
   return (
      <>
         <div className="expense-tracker">
            <header>
            

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


                     <label htmlFor="tanksize">Tank(L):</label>
                     <select

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
                        <option value="">EV</option>
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
                  <button type="button" id="display-button" onClick={() => setIsDisplayingFleet(prevState => !prevState)}>
                     {isDisplayingFleet ? 'Hide Fleet' : 'Display Fleet'}
                  </button>
<p></p>
                  
                  {isDisplayingFleet && (
  <div className="fleet-modal">
    <div className="fleet-modal-content">
      <div className="center-table">
        <table>
          <thead>
            <tr>
              <th>No #</th>
              <th>Make</th>
              <th>Model</th>
              <th>Registration</th>
            </tr>
          </thead>
          <tbody>
            {vehicles.map((vehicle, index) => (
              <tr key={vehicle.rego}>
                <td>{index + 1}</td>
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
                  <button type="button" onClick={handleToggleRecentExpenses}>
                     {isRecentExpensesVisible ? 'Hide Recent Expenses' : 'Show Recent Expenses'}
                  </button>
                  <div id="notification" className="notification">
                     {isTransactionAdded && <p>Transaction Added Successfully</p>}
                  </div>
                  <p></p>
                  <div>
                     {isRecentExpensesVisible && (
                        
                        <div class="center-table">
                           
                           <table>
                              <thead>
                                 <tr>
                                    <th>Type</th>
                                    <th>Amount</th>
                                    <th>Date</th>
                                 </tr>
                              </thead>
                              <tbody>
                                 {transactions.slice(-3).map((transaction) => {
                                    const { transactionType, transactionAmount, transactionDate } = transaction;
                                    return (
                                       <tr key={setUserId}>
                                          <td>{transactionType}</td>
                                          <td>$ {transactionAmount}</td>
                                          <td>{transactionDate}</td>
                                       </tr>
                                    );
                                 })}
                              </tbody>
                           </table>
                        </div>
                     )}


                  </div>

               </form>
            </div>

         </div>

         <div className="form-group">
        {/* Total Expenses Table */}
       

        {/* Pie Chart */}
        <div className="pie-chart-container">
        
          <canvas id="pieChart" width="300" height="300"></canvas>
        </div>

        <div className="total-expenses-container">
        <h3>{`Expense Breakdown: ${selectedVehicleName}`}</h3>
          <table>
            <thead>
              <tr>
                <th>Type</th>
                <th>Total Expense</th>
              </tr>
            </thead>
            <tbody>
              {totalExpenses.map((expense, index) => (
                <tr key={index}>
                  <td>{expense.type}</td>
                  <td>${Number(expense.total).toFixed(1)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div>
        {/* Step 1: Add date input for user to select date */}
        <label htmlFor="selectedDate">Select Date:</label>
        <input
          type="date"
          id="selectedDate"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
      </div>
        <div >
  <canvas id="pieChart2" width="300" height="300"></canvas>
</div>


      </div>

         <footer className="footer">
            {/* Your footer content goes here */}
            <p>&copy; 2023 Ridelog (team DB). All rights reserved.</p>
         </footer>

      </>
   );
};
