import { useState } from "react";
import "./index.css";
import axios from "axios";
import { baseUrl } from "../../BaseUrl";
import { useNavigate } from "react-router-dom";
import { cloudinaryName } from "../../BaseUrl";
import { uploadFile } from "../../BaseUrl";


const AddEmployee=()=>{

    const mobileRegex = /^[6-9]\d{9}$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    let onNavigate=useNavigate("")

    let [empName,setEmpName]=useState("")
    let [empEmail,setEmpEmail]=useState("")
    let [empMobile,setEmpMobile]=useState("")
    let [empDesignation,setEmpDesignation]=useState("")
    let [empGender,setEmpGender]=useState("")
    let [empCourse,setEmpCourse]=useState([])
    let [empImage,setEmpImage]=useState("")

    let [errText,setErr]=useState("")






  
    const allowedExtensions = ['jpg', 'png'];

  
    const handleFileChange = async(event) => {
   
      const selectedFile = event.target.files[0]; 
    
  
      if (selectedFile) {
        const fileName = selectedFile.name;
        const fileExtension = fileName.split('.').pop().toLowerCase(); 
  
        if (allowedExtensions.includes(fileExtension)) {
         
        setErr("Image is uploading please wait ....")
          let formData=new FormData()
          formData.append("file",selectedFile)
          formData.append("upload_preset",uploadFile)
          formData.append("cloud_name",cloudinaryName)

          let res=await fetch( `https://api.cloudinary.com/v1_1/${cloudinaryName}/image/upload`,{
            method:"post",
            body:formData
          })

          let result=await res.json()
                
          if(result.url){
          setEmpImage(result.url)
          setErr("")
          alert("image uploaded successfuly")
          }
          else{
              setEmpImage("")
           
              setErr("Invalid file type. Only .jpg and .png files are allowed.")
          }

        } 
        
        else {
          setEmpImage("");
       
          setErr('Invalid file type. Only .jpg and .png files are allowed.');
        }
      }
    };


    const onSelectCourse=(event)=>{
        const{checked,value}=event.target
        if(checked){
            setEmpCourse((state)=>[...state,value])
        }
        else{
            
            let index=empCourse.indexOf(value)
            empCourse.splice(index,1)
           setEmpCourse([...empCourse])
        }
        

    }


    const onSubmitEmpDetails=(event)=>{
            event.preventDefault()
            if(!emailRegex.test(empEmail)){
                    setErr("Invalid email address")
            }
            else if(!mobileRegex.test(empMobile)){
                setErr("Invalid mobile number")
            }
            else if(empName.length<3){
                setErr("Inavlid user name")
            }
            else if(empCourse.length && empDesignation!=="" && empGender!=="" && empImage!==""){
                setErr("")

                let employeeData={
                    empCourse,empName,empDesignation,empEmail,empImage,empGender,empMobile
                }
                axios.post(`${baseUrl}/employee/addEmployee`,{employeeData})
                .then(res=>{
                    if(res.status===200){
                        alert(res.data)
                        onNavigate("/employeeList")
                    }
                })
                .catch(err=>{
                    setErr(err.response.data)
                })

            }
            else{
                setErr("Enter all necessary * details")
            }


    }



    return(


        <div className="add-employee-main-container">
        
     <div className="add-employee-sub-container">


<h1 className="create-employee-header">Create Employee</h1>

    <form>

        <div className="emp-text-container">
            <label htmlFor="emp-name" className="emp-text">Name *</label>
            <input type="text" id="emp-name" className="employee-input-text" onChange={(event)=>setEmpName(event.target.value)}/>
        </div>

        <div className="emp-text-container">
            <label htmlFor="emp-email" className="emp-text">Email *</label>
            <input type="text" id="emp-email" className="employee-input-text" onChange={(event)=>setEmpEmail(event.target.value)}/>
        </div>

        <div className="emp-text-container">
            <label htmlFor="emp-number" className="emp-text">Mobile Number *</label>
            <input type="text" id="emp-number" className="employee-input-text" onChange={(event)=>setEmpMobile(event.target.value)}/>
        </div>

            <div className="emp-text-container">
            <label htmlFor="designation" className="emp-text">Designation *</label>
            <select className="emp-select" id="designation" onChange={(event)=>setEmpDesignation(event.target.value)}>
                <option value="">Choose Designation</option>
                <option value="HR">HR</option>
                <option value="Manager">Manager</option>
                <option value="Sales">Sales</option>
            </select>
            </div>


        
                
                <div className="gender-main-container">
                    <p className="emp-text">Gender *</p>
                    <div className="gender-sub-container">
                        <input type="radio" name="gender" value="male" className="gender-radio" id="male" onChange={(event)=>setEmpGender(event.target.value)}/>
                        <label htmlFor="male">Male</label>
                    </div>

                    <div className="gender-sub-container">
                        <input type="radio" name="gender" value="female" className="gender-radio" id="female" onChange={(event)=>setEmpGender(event.target.value)}/>
                        <label htmlFor="female">Female</label>
                    </div>

                  

            
                </div>


                <div className="gender-main-container">
                    <p className="emp-text">Course *</p>
                    <div className="gender-sub-container">
                        <input type="checkbox" value="MCA" name="course" className="course" id="MCA" onChange={onSelectCourse}/>
                        <label htmlFor="MCA"  className="emp-text" >MCA</label>
                    </div>

                    <div className="gender-sub-container">
                        <input type="checkbox" value="BCA" name="course" className="course" id="BCA" onChange={onSelectCourse}/>
                        <label htmlFor="BCA"  className="emp-text"  >BCA</label>
                    </div>

                    <div className="gender-sub-container">
                        <input type="checkbox" value="BSC" name="course" className="course" id="BSC"  onChange={onSelectCourse}/>
                        <label htmlFor="BSC"  className="emp-text" >BSC</label>
                    </div>
                  

            
                </div>

                <div className="emp-text-container">
                    <label htmlFor="emp-image" className="emp-text">Upload Image *</label>
                    <input type="file" id="emp-image"  onChange={handleFileChange }/>
                </div>

                {errText!=="" && <p className="login-err-emp-text">{errText}</p>}

                <button className="emp-button" onClick={onSubmitEmpDetails}>Submit</button>
        
    </form>
</div>
            
          

        </div>
    )
}

export default AddEmployee;