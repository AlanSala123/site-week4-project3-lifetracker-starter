import './App.css'
import axios from 'axios'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from '../login/login'
import Navbar from '../Navbar/Navbar'
import Register from '../Register/Register'

function App() {

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={
          <main>
            <Navbar />
            <Login />
          </main>
          } />
          <Route path="/Register" element={
          <main>
            <Navbar />
            <Register />
          </main>
          } />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
