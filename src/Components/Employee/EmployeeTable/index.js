import { useState } from "react";
import "./index.css";
import { Link, useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { TiArrowSortedDown } from "react-icons/ti";
import Pages from "../Pages";
import { baseUrl } from "../../BaseUrl";
import axios from "axios";



const Employeetable=(props)=>{

 

    let onNavigate=useNavigate("")

    let {employeeList}=props
    let [emplyoeeData,setData]=useState(employeeList.slice(0,10))

    let [isASEC,setASEC]=useState(false)

    
    const onDeleteEmployee=async (id)=>{
   
        await axios.delete(`${baseUrl}/employee/deleteEmployee/${id}`)
        .then(res=>{
            window.location.reload()
        })
        .catch(err=>alert("Error occured"))
      }
   


const onSortUserData=(sortValue)=>{

    if(isASEC){
        let sortData=emplyoeeData.sort((a,b)=>b[sortValue].localeCompare(a[sortValue]))
        setData(sortData)
    }
    else{
        let sortData=emplyoeeData.sort((a,b)=>a[sortValue].localeCompare(b[sortValue]))
        setData(sortData)
    }
}

const onSortDetails=(sortValue)=>{
    setASEC(()=>!isASEC)
    onSortUserData(sortValue)
 
}

const onSearchEmployee=(search)=>{
        let searchkey=search.toLowerCase()
        let filterData=employeeList.filter(each=>(each.empName.toLowerCase().includes(searchkey) || each.empEmail.toLowerCase().includes(searchkey) ))
        setData(filterData.slice(0,10))
    }

const onSetDisplayList=(number)=>{
    let displyList=employeeList.slice(10*(number-1),number*10)
    setData(displyList)
}

    return(


   
        <div className="employeelist-main-container">

<div className="user-search-container">
    <div className="user-craete-container">
    <p className="user-count-text" style={{fontSize:"23px",color:"green"}}>Employee List</p>
        <button className="user-create-employee-button" onClick={()=>onNavigate("/addEmployee")}>+ Create new Employee </button>
        <p className="user-count-text">Total Count: {employeeList.length}</p>
        
    </div>
  

    <div className="user-search-input-container">
        <input type="search" placeholder="Enter serach keyword" className="user-search-input" onChange={(event)=>onSearchEmployee(event.target.value)}/>
        <button className="user-search-button" ><FaSearch size="18"/> </button>

    </div>

</div>
<table border="1" style={{ width: '100%', borderCollapse: 'collapse' }} cellPadding="1">

<thead>


<tr style={{backgroundColor:"black",color:"white"}}>
<th> <p className="user-sort-text">Unique Id <TiArrowSortedDown  size="20" color="white" onClick={()=>onSortDetails("_id")}/></p></th>
<th>Image</th>
<th><p className="user-sort-text"> Name <TiArrowSortedDown  size="20" color="white" onClick={()=>onSortDetails("empName")}/></p>  </th>
<th ><p className="user-sort-text"> Email <TiArrowSortedDown  size="20" color="white" onClick={()=>onSortDetails("empEmail")}/></p></th>
<th>Mobile No</th>
<th>Designation</th>
<th>Course</th>
<th>Gender</th>
<th><p className="user-sort-text">Create date <TiArrowSortedDown  size="20" color="white" onClick={()=>onSortDetails("_id")} style={{margin:"0px"}}/></p>  </th>
<th>Action</th>

</tr>
</thead>
<tbody>
{emplyoeeData.map((each) => {
let { empCourse,
empName ,
empDesignation,
empEmail,
empImage,
empGender,
empMobile,
_id,createdAT
}=each


const createdDate=createdAT.split("T")[0]

return(
    <tr key={_id}>
        <td>{_id}</td>
        <td><img src={empImage} className="emp-image" alt="emp-Image"/></td>
        <td>{empName}</td>
        <td>{empEmail}</td>
        <td>{empMobile}</td>
        <td>{empDesignation}</td>
        <td>{empCourse}</td>
        <td>{empGender}</td>
        <td>{createdDate}</td>
        <td><button className="edit-button"><Link to={`/updateEmployee/${_id}`} className="edit-button" >Edit</Link></button> <button className="delete-button" onClick={()=>onDeleteEmployee(_id)}>Delete</button></td>
  </tr>
)

})}
</tbody>
</table>


<div className="page-notation-container">
   <Pages emplyoeeData={employeeList} onSetDisplayList={onSetDisplayList}/>
</div>


</div>
 
       
    )
}


export default Employeetable;