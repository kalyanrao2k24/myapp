import {  useState } from "react";
import "./index.css";
import { useNavigate } from "react-router-dom";
import CompanyLogo from "../../../assets/companylogo.jpg"
import axios from "axios";
import { baseUrl } from "../../BaseUrl";

const Navbar=()=>{
    let [isLogin,setIsLogin]=useState(false)
    let [userName,setUserName]=useState("")
    let jwtToken=JSON.parse(localStorage.getItem("jwtToken"))

    let onNvaigate=useNavigate("")

       
  

    const OnGetUserDetails=()=>{
        axios.get(`${baseUrl}/user/getUserDetails/${jwtToken}`)
        .then(res=>{
            setIsLogin(true)
            setUserName(res.data.name)
        })
        .catch(err=>{
            setIsLogin(false)
        })
    }

    if(jwtToken){
        OnGetUserDetails()
    }
  
    const onuserLogout=async()=>{
        await localStorage.removeItem("jwtToken")
        setIsLogin(false)
        onNvaigate("/login")
        window.history.replaceState(null, '', '/login');
        
    }
    return(
        
        <div className="navbar-main-container">

            <div className="navbar-container">
                <div className="navbar-sub-container">
                    <img src={CompanyLogo} alt="logo-image" className="company-logo"/>
                    {isLogin && <p onClick={()=>onNvaigate("/")}>Home</p>} 
                    {isLogin && <p onClick={()=>onNvaigate("/employeeList")}>Employee List</p>} 
                   
                </div>
                <div className="navbar-sub-container">
                    {isLogin && <p>{userName}</p>} 
                   {isLogin && <p onClick={onuserLogout}>Logout</p>} 
                   {!isLogin && <p onClick={()=>onNvaigate("/login")}>Login</p>} 
                </div>
               

            </div>
            

        </div>
    )
}

export default Navbar;