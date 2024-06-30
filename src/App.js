
import './App.css';
import Signup from './component/Signup';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Login from './component/Login';
import Tasks from './component/Tasks';
import Leaves from './component/Leaves';
import Home from './component/Home';
import EditProfile from './component/EditProfile';

function App() {

  
  return (
   
    <div className="App">
    <h1>this line is sample for the git hub</h1>
      <BrowserRouter>
      <Routes>
     <Route path='/Home' element={<Home/>}></Route>
    <Route path="/" element ={<Login/>}></Route>
    <Route path ="/Signup" element ={<Signup/>}></Route>
    <Route path ="/Tasks" element ={<Tasks/>}></Route>
    <Route path ="/Leaves" element ={<Leaves/>}></Route>
     <Route path ="/EditProfile" element={<EditProfile/>}></Route>  
      </Routes>
      </BrowserRouter>
 
      
    </div>
  );
}

export default App;
