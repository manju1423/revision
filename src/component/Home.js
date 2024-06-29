import React from 'react'
import TopNavigation from './TopNavigation'
import { useSelector } from 'react-redux';
function Home() {

let storeObj = useSelector((store)=>{
console.log(store);
return store;
})

  return (
    <div>
        <TopNavigation/>
        <h1> welcome {storeObj.loginReducer.userDetails.firstName}
          <br></br>
          {storeObj.loginReducer.userDetails.lastName}
          <br></br>
          {storeObj.loginReducer.userDetails.age}
          <br></br>
          <img src={`http://localhost:8181/${storeObj.loginReducer.userDetails.profilePic}`}></img>
        </h1>
    </div>
  )
}

export default Home