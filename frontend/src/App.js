
import './App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Login from './Pages/Home/Login';
import Signup from './Pages/Home/Signup';
import MainPage from './Pages/Home/MainPage';
import ProfileCard from './Components/Cards/ProfileCard';
import Dashboard from './Pages/Home/Dashboard';
const routes = (
  <Router>
    <Routes>
      <Route path='/' element={<Dashboard/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path= '/Signup' element={<Signup/>}/>
      <Route path= '/mainpage' element={<MainPage/>}/>
      <Route path= '/ProfileCard' element={<ProfileCard/>}/>
    </Routes>
  </Router>
);


function App() {
  return (
    <div className="App">
     {routes}
    </div>
  );
}

export default App;
