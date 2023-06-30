import "./Register.css"
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function Register() {
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')
    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
    })

    const handleOnInputChange = (event) => {
        if (event.target.name === "email") {
            if (event.target.value.indexOf("@") === -1) {
                setError("Please enter a valid email.")
            } else {
                setError(null)
            }
        }
        setForm((f) => ({ ...f, [event.target.name]: event.target.value }))
    }

    const handleOnSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true)
        setError(null)

        try {
            const res = await axios.post("http://localhost:3001/auth/register", {
                firstName: form.firstName,
                lastName: form.lastName,
                email: form.email,
                password: form.password,
            })

            if (res?.data?.user) {
                setIsLoading(false)
                navigate("/login")
            } else {
                setError("That email is already in use")
                setIsLoading(false)
            }
        } catch (err) {
            const message = err?.response?.data?.error?.message
            setError({ message })
            setIsLoading(false)
        }
    }
    return (
        <div className="Register">
            <h1>Register</h1>
            <div className="regForm">
                <form>
                    <label for="firstName">First Name</label><br />
                    <input type="text" placeholder="Add your first name here!" id="name_input" name="firstName" value={form.firstName}
                        onChange={handleOnInputChange} /><br /><br />
                    <label for="lastName">Last Name</label><br />
                    <input type="text" placeholder="Add your last name here!" id="last_input" name="lastName" value={form.lastName}
                        onChange={handleOnInputChange} /><br /><br />
                    <label for="email">Email</label><br />
                    <input type="email" placeholder="Add your email here!" id="email" name="email" value={form.email}
                        onChange={handleOnInputChange} /><br /><br />
                    <label for="password">Password</label><br />
                    <input type="password" placeholder="Add your secret password here" id="password" name="password" value={form.password}
                        onChange={handleOnInputChange} /><br /><br />
                    <button onClick={handleOnSubmit}> Sign up </button>
                </form>
                {
                    error?.length > 0 ? <h2 style={{ color: 'red' }}>{error}</h2> : null
                }
            </div>
        </div>
    )
}

export default Register