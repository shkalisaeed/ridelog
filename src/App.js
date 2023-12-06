//import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {Auth} from "./pages/auth/index";
import {ExpenseTracker} from "./pages/expense-tracker/index";
import {YourComponent} from "./pages/FAQ/index";
import {Mission} from './pages/mission/index';
import {Team} from './pages/team/index';
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" exact element={<Auth/>}/>
          <Route path="/expense-tracker" element={<ExpenseTracker/>}/>
          <Route path="/FAQ" element={<YourComponent/>}/>
          <Route path="/mission" element={<Mission/>}/>
          <Route path='/team' element={<Team/>}/>
        </Routes>
        </Router>
      
    </div>
  );
}

export default App;
