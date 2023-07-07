import "./Login.css"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import jwtDecode from "jwt-decode"

function Login({ setIsLoggedIn, setUserName, form, setForm }) {
    //setting the useState
    const navigate = useNavigate()
    const [errors, setErrors] = useState('')

    //handle the form input change
    const handleOnInputChange = (event) => {
        if (event.target.name === "email") {
            if (event.target.value.indexOf("@") === -1) {
                setErrors("Please enter a valid email")
            } else {
                setErrors(null)
            }
        }
        setForm((f) => ({ ...f, [event.target.name]: event.target.value }))
    }

    //function that is run whenever someone presses the submit button
    const handleOnSubmit = async (e) => {
        e.preventDefault()
        setErrors(null)
        try {
            const res = await axios.post(`http://localhost:3001/auth/login`, form)
            if (!(res?.data === "Invalid username/password")) {
                const { token } = res.data
                localStorage.setItem("token", token)
                setIsLoggedIn(true)
                const decodedToken = jwtDecode(token)
                setUserName(decodedToken.emailaddress)
                navigate("/Activity")
            } else {
                setErrors("Invalid username/password combination")
            }
        } catch (err) {
            const message = err?.response?.data?.error?.message
            setErrors({ message })
        }
    }
    return (
        <div className="Login">
            <h1>Welcome</h1>
            <div className="logForm">
                <form>
                    <label for="email">Email</label><br />
                    <input type="email" placeholder="Add your email here!" id="email" name="email" value={form.email}
                        onChange={handleOnInputChange} /><br /><br />
                    <label for="password">Password</label><br />
                    <input type="password" placeholder="Add your secret password here" id="password" name="password" value={form.password}
                        onChange={handleOnInputChange} /><br /><br />
                    <button className="logButton" onClick={handleOnSubmit}>Log in</button>
                </form>
                {
                    errors?.length > 0 ? <h2 style={{ color: 'red' }}>{errors}</h2> : null
                }
            </div>
        </div>
    )
}

export default Login
