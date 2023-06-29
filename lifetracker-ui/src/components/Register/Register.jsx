import "./Register.css"

function Register() {
    return (
        <div className="Register">
        <h1>Register</h1>
        <div className="regForm">
            <form>
                <label for="email">Email</label><br/>
                <input type="email" placeholder="Add your email here!" id="email" name="email" /><br/><br/>
                <label for="password">Password</label><br/>
                <input type="password" placeholder="Add your secret password here" id="password" name="password" /><br/><br/>
                <button> Sign up </button>
            </form>
        </div>
    </div>
    )
}

export default Register