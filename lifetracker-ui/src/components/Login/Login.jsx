import "./Login.css"

function Login() {
    return (
        <div className="Login">
            <h1>Welcome</h1>
            <div className="logForm">
                <form>
                    <label for="email">Email</label><br/>
                    <input type="email" placeholder="Add your email here!" id="email" name="email" /><br/><br/>
                    <label for="password">Password</label><br/>
                    <input type="password" placeholder="Add your secret password here" id="password" name="password" /><br/><br/>
                    <button>Log in</button>
                </form>
            </div>
        </div>
    )
}

export default Login;