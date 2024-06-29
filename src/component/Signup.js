import React from 'react'
import { Link } from 'react-router-dom'
import {useRef,useState} from "react";
function Signup() {
    let firstNameInputRef = useRef();
    let LastNameInputRef = useRef();
    let ageInputRef = useRef();
    let emailInputRef = useRef();
    let passwordInputRef = useRef();
    let mobileNoInputRef = useRef();
    let profilePicInputRef = useRef();
       
    let [profilePicPath, setProfilePicPath]= useState("./imag/noimag.png");


 let onSignupUsingJSON = async()=>{

    let dataToSend ={
        fn:firstNameInputRef.current.value,
        ln:LastNameInputRef.current.value,
        age:ageInputRef.current.value,
        email:emailInputRef.current.value,
        password:passwordInputRef.current.value,
        mobileNo:mobileNoInputRef.current.value,
        profilePic:profilePicInputRef.current.value,
    };
    
    let JSONDataToSend =JSON.stringify(dataToSend);

    let myHeader = new Headers();
    myHeader.append("content-type","application/json");

    

    let reqOptions={
        method:"POST",
        body:JSONDataToSend,
        headers: myHeader,
    };

    let JSONformat = await fetch("http://localhost:8181/signup",reqOptions);

    let JSObject = await JSONformat.json();
    console.log(JSObject);
 };
 let onSignupUsingURLE = async()=>{
        let myHeader= new Headers();
        myHeader.append("Content-type","application/x-www-form-urlencoded")
        
        let dataToSend = new URLSearchParams();

        dataToSend.append("fn",firstNameInputRef.current.value);
        dataToSend.append("ln",LastNameInputRef.current.value);
        dataToSend.append("age",ageInputRef.current.value);
        dataToSend.append("email",emailInputRef.current.value);
        dataToSend.append("password",passwordInputRef.current.value);
        dataToSend.append("mobileNo",mobileNoInputRef.current.value,);
        dataToSend.append("profilePic",profilePicInputRef.current.value,);
        

        let reqOptions={
            method:"POST",
            header: myHeader,
            body : dataToSend

        }
        let JSONformat = await fetch("http://localhost:8181/signup",reqOptions);
        
        let JSObject = await JSONformat.json();
        

        console.log(JSObject);
 };
  let onSignupUsingFormData = async()=>{

    let dataToSend = new FormData();

    dataToSend.append("fn",firstNameInputRef.current.value);
        dataToSend.append("ln",LastNameInputRef.current.value);
        dataToSend.append("age",ageInputRef.current.value);
        dataToSend.append("email",emailInputRef.current.value);
        dataToSend.append("password",passwordInputRef.current.value);
        dataToSend.append("mobileNo",mobileNoInputRef.current.value,);
       

        for(let i=0;i<profilePicInputRef.current.files.length;i++){
            dataToSend.append("profilePic",profilePicInputRef.current.files[i]);  
        }

    let reqOptions={
        method:"POST",
        body:dataToSend,
    };

    let JSONformat = await fetch("http://localhost:8181/signup",reqOptions);

    let JSObject = await JSONformat.json();
    if(JSObject.status =="success"){
        alert(JSObject.msg);
    }

        console.log(JSObject);

  };


  return (
    <div>
    <div className='farm'>
        <h3>INTRO TO THE POST METHOD</h3>
        <h3> SIGN UP FORM</h3>
        <form>
            <div>
                <label>First Name</label>
                <input ref={firstNameInputRef}></input>
            </div>
            <div>
                <label>LastName</label>
                <input ref={LastNameInputRef}></input>
            </div>
            <div>
                <label>Age</label>
                <input ref={ageInputRef}></input>
            </div>
            <div>
                <label>Email</label>
                <input ref ={emailInputRef}></input>
            </div>
            <div>
                <label>Password</label>
                <input ref={passwordInputRef}></input>
            </div>
            <div>
                <label>MobileNo</label>
                <input ref={mobileNoInputRef}></input>
            </div>
            <div>
                <label>ProfilePic</label>
                <input ref={profilePicInputRef} type ="file"  onChange={(eventobj)=>{
                 let selectedImagePath =URL.createObjectURL(eventobj.target.files[0]);
                 setProfilePicPath(selectedImagePath);           
                }}></input>
                <br></br>
        <img src={profilePicPath} className='profilePicPreview'></img>            
            </div>
            {/* <button type="button" onClick={()=>{
                onSignupUsingJSON();
            }}>Login(JSON)sending through json format</button>
             <button type="button" onClick={()=>{
             onSignupUsingURLE();
            }}>Login(URLE)sending data through urlencoded</button> */}
         <button type="button" onClick={()=>{
             onSignupUsingFormData();
            }}>Login through (FORM DATA)</button>
        </form>
       
    </div>
    <br></br>
        <Link to ="/">Login</Link>
    </div>
  )
}

export default Signup