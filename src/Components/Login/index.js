import "./index.css";
import CompanyLogo from "../../assets/companylogo.jpg"
import {useState} from "react"
import axios from "axios";
import { baseUrl } from "../BaseUrl";
import { useNavigate } from "react-router-dom";

const Login=()=>{

    let [userName,setUserName]=useState("")
    let [password,setPassword]=useState("")
    let [errMsg,setErrMsg]=useState("")
    let [showErr,setShowErr]=useState(false)

    let onNvaigate=useNavigate("")

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    

    const onSubmitUserDetails=(event)=>{
        event.preventDefault()

        if(userName==="" || password===""){
            setShowErr(true)
            setErrMsg("Enter valid user details")
        }
        else if(!emailRegex.test(userName)){
            setShowErr(true)
            setErrMsg("Inavalid email address")
        }
        else if(!passwordRegex.test(password)){
            setShowErr(true)
            setErrMsg("Password has atleast 8 Characters includes 0-9, a-z, A-Z, #@&%$")
        }
        else{
            setErrMsg("")
            setShowErr(false)
           
            axios.get(`${baseUrl}/user/login/${userName}/${password}`)
            .then(res=>{
                setShowErr(false)
                if(res.status===200){
                    let {jwtToken}=res.data
                    setUserName("")
                    setPassword("")
                    setShowErr(false)
                    localStorage.setItem("jwtToken",JSON.stringify(jwtToken))
                    onNvaigate("/")
                    
                }
                
            })
            .catch(err=>{
           
                setShowErr(true)
                setErrMsg(err.response.data)

             
            })

        }

    }


    return(
        <div className="login-main-container">


        <div className="login-sub-container">
            <div className="comapny-logo-container">
                <img src={CompanyLogo} alt="logo-image" className="company-logo"/>
                <p className="login-text">Login</p>
            </div>
            <form onSubmit={onSubmitUserDetails}>
                <input type="text" autoComplete="email" placeholder="Enter User Name" className="login-input-text" onChange={(event)=>setUserName(event.target.value.trim())}/> <br />
                <input type="password" autoComplete="password"  placeholder="Enter password" className="login-input-text" onChange={(event)=>setPassword(event.target.value.trim())}/> <br />
                {showErr && <p className="login-err-text">{errMsg}</p>}
                <button className="user-login-button" type="submit">Login</button>
            </form>

        </div>
        </div>
       
    )
}

export default Login;