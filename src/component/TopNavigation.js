import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';

function TopNavigation() {

let navigate = useNavigate();

let storeObj = useSelector((store )=>{
  console.log(store);

  return store;
});

useEffect(()=>{if (storeObj.loginReducer.userDetails.email){

}else{
 navigate("/");
}},[]);


let onDeleteAccount = async()=>{
localStorage.clear();
let dataToSend= new FormData();
dataToSend.append("email",storeObj.loginReducer.userDetails.email);
let reqOptions={
  method:"delete",
  body:dataToSend,
};

let JSONformat = await fetch("http://localhost:8181/deleteProfile",reqOptions);
let JSObject = await JSONformat.json();
 if (JSObject.status =="success"){
  alert(JSObject.msg);
 }else{
  alert(JSObject.msg);

 }


};

  return (
    <div>
        <nav>
            <NavLink to ="/Home">Home</NavLink>
            <NavLink  to ="/Tasks">Tasks</NavLink>
            <NavLink to="/Leaves">Leaves</NavLink>
            <NavLink to="/EditProfile">Edit profile</NavLink>
            <NavLink to="/" onClick={()=>{
                onDeleteAccount();
            }}>Delete profile</NavLink>
            
            <NavLink to ="/" onClick={()=>{
              localStorage.clear();
            }}>Logout</NavLink>
        </nav>
    </div>
  )
}

export default TopNavigation