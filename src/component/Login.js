import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {useRef} from 'react';
import { useDispatch } from 'react-redux';
import axios from "axios";

function Login() {

  let emailInputRef = useRef();
  let passwordInputRef = useRef();
  let navigate = useNavigate();
  let dispatch = useDispatch();
  axios.defaults.baseURL = 'http://localhost:8181';

  axios.defaults.headers.common['Authorization'] = localStorage.getItem("token");

useEffect(()=>{
  validateToken();
},[]);


  let validateLogin = async()=>{

      let dataToSend=new FormData();
      dataToSend.append("email", emailInputRef.current.value);
      dataToSend.append("password", passwordInputRef.current.value);

  let reqOptions={
        method:"POST",
        body: dataToSend,
      };

     
  let JSONformat = await fetch("http://localhost:8181/login",reqOptions);
  
  let JSObject = await JSONformat.json();
  if(JSObject.status =="failure"){
    alert(JSObject.msg);
  }   else{
    localStorage.setItem("token",JSObject.data.token);
    dispatch({type:"login",data:JSObject.data})
    navigate("/Home");
  }


  console.log(JSObject);


  };
  let validateLoginThroughAxioss = async()=>{
    let dataToSend=new FormData();
    dataToSend.append("email", emailInputRef.current.value);
    dataToSend.append("password", passwordInputRef.current.value);

  let response= await axios.post("/login",dataToSend);
 
 dispatch({type:"login",data:response.data.data});
 if(response.data.data.status =="failure"){
  alert(response.data.data.msg);
}   else{
  localStorage.setItem("token",response.data.data.token);
  dispatch({type:"login",data:response.data.data})
  navigate("/Home");
}
  console.log(response);


  };
  
  



  let validateCredentials =()=>{
      console.log("inside  validateCrendentials");
      return async()=>{
        let dataToSend=new FormData();
      dataToSend.append("email", emailInputRef.current.value);
      dataToSend.append("password", passwordInputRef.current.value);

  let reqOptions={
        method:"POST",
        body: dataToSend,
      };

     
  let JSONformat = await fetch("http://localhost:8181/login",reqOptions);
  
  let JSObject = await JSONformat.json();
  if(JSObject.status =="failure"){
    alert(JSObject.msg);
  }   else{
    localStorage.setItem("token",JSObject.data.token);
    dispatch({type:"login",data:JSObject.data})
    navigate("/Home");
  }


  console.log(JSObject);


      }
  };




  let validateToken = async()=>{
    if(localStorage.getItem("token")){
      let dataToSend = new FormData();
    dataToSend.append("token",localStorage.getItem("token"));


    let reqOptions = {
      method:"POST",
      body: dataToSend,
    };
    let JSONformat = await fetch("http://localhost::8181/loginWithToken",reqOptions);
    let JSObject=  await JSONformat.json();
    if(JSObject.status =="failure"){
      alert(JSObject.msg);
    }   else{
     
      dispatch({type:"login",data:JSObject.data})
      navigate("/Home");
    }

    console.log(JSObject);

    }

    
  };
  



  return (
    <div>
    <div className='login'>
      <div>
       <label > Email</label>
       <input ref= {emailInputRef}></input>
       </div>
       <div>
       <label> password</label>
       <input  ref={passwordInputRef}></input>
       </div>
       <button type = "button" onClick={()=>{
        // validateLogin();
      // dispatch(validateCredentials());
      validateLoginThroughAxioss();
       }} >Login</button>
        
        
       
    </div>
    <br></br>
    <Link to ="/Signup">signup</Link>
    </div>
  )
}

export default Login