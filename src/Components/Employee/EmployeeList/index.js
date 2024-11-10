import axios from "axios";
import "./index.css";
import { baseUrl } from "../../BaseUrl";
import { useEffect, useState } from "react";
import Employeetable from "../EmployeeTable";
import Loader from "../../Loader";
import { useNavigate } from "react-router-dom";
import employee from "../../../assets/employee.jpg"


const EmployeeList=()=>{

    let [employeeList,setList]=useState([])
    let [isLoading,setLoading]=useState(true)

    let jwtToken=JSON.parse(localStorage.getItem("jwtToken"))

  let onNavigate=useNavigate("")

const getEmployeeList=()=>{

    axios.get(`${baseUrl}/employee/getEmployeeList`)
    .then(res=>{
        setLoading(false)
        setList(res.data)
    })
    .catch(err=>{
      setLoading(false)
      setList([])
    })
}





  
useEffect(()=>{
  if(jwtToken!==null){
    getEmployeeList()
  }
    
})


return(
        <div className="employeelist-main-container">
            {isLoading && <Loader />}
            {employeeList.length===0 && <div className="empty-list-container">
                                            <img src={employee} className="admin-image" alt="images" />
                                            <p>Your Employee List is Empty</p>
                                            <button className="user-create-employee-button" onClick={()=>onNavigate("/addEmployee")}>+ Create new Employee </button>
                    
                                        </div>
              
              }
            {(employeeList.length!==0 && !isLoading) && <Employeetable employeeList={employeeList} />} 
        </div>
    )
}


export default EmployeeList;