import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from '../login/login'
import Navbar from '../Navbar/Navbar'
import Register from '../Register/Register'
import Home from '../Home/Home'
import ActivityPage from '../ActivityPage/ActivityPage'
import { useState } from 'react'


function App() {
  const [welcome, setWelcome] = useState('');

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={
          <main>
            <Navbar />
            <Login welcome={welcome} setWelcome={setWelcome}/>
          </main>
          } />
          <Route path="/Register" element={
          <main>
            <Navbar />
            <Register />
          </main>
          } />
          <Route path="/" element={
           <main>
            <Navbar />
            <Home />
           </main> 
          } />
          <Route path="/Activity" element={
            <main>
              <Navbar />
              <ActivityPage welcome={welcome}/>
            </main>
          } />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
