import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from '../login/login'
import Navbar from '../Navbar/Navbar'
import Register from '../Register/Register'
import Home from '../Home/Home'
import ActivityPage from '../ActivityPage/ActivityPage'
import { useState, useEffect } from 'react'
import jwtDecode from 'jwt-decode'
import ExcercisePage from '../ExercisePage/ExcercisePage'


function App() {
  //useState for login, should initially be set to false
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  //useState for the user name of the person who signed into thier account
  const [userName, setUserName] = useState();

  useEffect(() => {
    const checkLoggedIn = () =>{
      //check if the user is logged in when they first access the webpage
      const token = localStorage.getItem("token");
      if (token) {

        const decodedToken = jwtDecode(token);
        console.log(decodedToken)
        setUserName(decodedToken.emailaddress);

        //check to see if the token has expired
        if (decodedToken.exp * 1000 > Date.now()){
          setIsLoggedIn(true);
        } else {
          localStorage.removeItem("token");
          setIsLoggedIn(false);
        }
      }
    };
    checkLoggedIn();
  },[])

  const handleLogout = () => {
    localStorage.removeItem("token")
    setIsLoggedIn(false);
  }

  return (
    <div>
      <BrowserRouter>
      <Navbar isLoggedIn={isLoggedIn} handleLogout={handleLogout}/>
        <Routes>
          <Route path="/login" element={
          <main>
            <Login setIsLoggedIn={setIsLoggedIn} setUserName={setUserName}/>
          </main>
          } />
          <Route path="/Register" element={
          <main>          
            <Register />
          </main>
          } />
          <Route path="/" element={
           <main>
            <Home />
           </main> 
          } />
          <Route path="/Activity" element={
            <main>
              <ActivityPage isLoggedIn={isLoggedIn} userName={userName}/>
            </main>
          } />
          <Route path="/Excercise" element={
            <main>
              <ExcercisePage isLoggedIn={isLoggedIn}/>
            </main>
          } />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
