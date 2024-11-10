import "./index.css";
import {useNavigate} from "react-router-dom";
import adminImage from "../../../assets/admin.avif"
import { useEffect } from "react";

const Home=()=>{

    let onNavigate=useNavigate("")

    let jwtToken=JSON.parse(localStorage.getItem("jwtToken"))
    useEffect(()=>{
        if(jwtToken===null){
            onNavigate("/login")
        }
    })
    return(
        
        <div className="dashboard-main-container">
            <img src={adminImage} className="admin-image" alt="images" />
            <p className="dashboard-text">Welcome Admin Panel</p>
            <button className="user-create-employee-button" onClick={()=>onNavigate("/addEmployee")}>+ Create new Employee </button>

        </div>
    )
}

export default Home;