import "./index.css";
import notfound from "../../assets/notfound.jpg"


const NotFound=()=>{
    return(
        <div className="not-main-container">
            <img src={notfound} alt="images" width="350px" height="200px" />
        </div>
    )
}

export default NotFound;