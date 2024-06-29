import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import {useRef,useState} from "react";
import TopNavigation from './TopNavigation';
import { useSelector } from 'react-redux';

function EditProfile() {
    let firstNameInputRef = useRef();
    let LastNameInputRef = useRef();
    let ageInputRef = useRef();
    let emailInputRef = useRef();
    let passwordInputRef = useRef();
    let mobileNoInputRef = useRef();
    let profilePicInputRef = useRef();
       
    let [profilePicPath, setProfilePicPath]= useState("./imag/noimag.png");

    let storeObj = useSelector((store)=>{


        return store;    
        });
    
    
    useEffect(()=>{
        firstNameInputRef.current.value = storeObj.loginReducer.userDetails.firstName;
        LastNameInputRef.current.value = storeObj.loginReducer.userDetails.lastName;
        ageInputRef.current.value = storeObj.loginReducer.userDetails.age;
        emailInputRef.current.value = storeObj.loginReducer.userDetails.email;
        
        mobileNoInputRef.current.value = storeObj.loginReducer.userDetails.mobileNo;

        let profilePicPath = `http://localhost:8181/${storeObj.loginReducer.userDetails.profilePic}`
        setProfilePicPath(profilePicPath);
    },[]);



  let onUpdateProfle = async()=>{

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
        method:"PUT",
        body:dataToSend,
    };

    let JSONformat = await fetch("http://localhost:8181/updateProfile",reqOptions);

    let JSObject = await JSONformat.json();
    if(JSObject.status =="success"){
        alert(JSObject.msg);
    }

        console.log(JSObject);

  };


  return (
    <div>
        <TopNavigation/>
    <div className='farm'>
        
        <h3> EDIT USER PROFILE</h3>
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
                <input ref={ageInputRef}type ="number"></input>
            </div>
            <div>
                <label>Email</label>
                <input ref ={emailInputRef} readOnly ></input>
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
             onUpdateProfle();
            }}>Update Profile</button>
        </form>
       
    </div>
    <br></br>
        <Link to ="/">Login</Link>
    </div>
  )
}

export default EditProfile