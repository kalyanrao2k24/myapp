import "./index.css"
import Login from "./Components/Login";
import {BrowserRouter as Router, Routes,Route} from "react-router-dom";
import Dashboard from "./Components/Dashboard/Home";
import Navbar from "./Components/Dashboard/Navbar";
import Home from "./Components/Dashboard/Home";
import AddEmployee from "./Components/Employee/NewEmployee";
import EmployeeList from "./Components/Employee/EmployeeList";
import UpdateEmployee from "./Components/Employee/UpdateEmployee";
import ProtectRoute from "./Components/ProtectRoute";
import NotFound from "./Components/NotFound";

const App=()=>{

  return(
      <Router future={{ v7_relativeSplatPath: true }}>
        <Navbar/>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/addEmployee" element={ <ProtectRoute element={<AddEmployee />}/>} />
          <Route path="/employeeList" element={<ProtectRoute element={<EmployeeList />}/>} />
          <Route path="/updateEmployee/:id" element={<ProtectRoute element={<UpdateEmployee />} />} />

          <Route path="/dashboard" element={<ProtectRoute element={<Dashboard />} />}/>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
       
 
  )
}

export default App;