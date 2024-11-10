
import Login from "../Login";

const ProtectRoute=({element,...res})=>{


    let jwtToken=JSON.parse(localStorage.getItem("jwtToken"))

    if(jwtToken===null){
        return <Login />
        
    }
    else{
       return element
    }
   
}

export default ProtectRoute;