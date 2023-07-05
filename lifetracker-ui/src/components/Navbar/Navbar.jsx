import "./Navbar.css"

function Navbar({ isLoggedIn, handleLogout }) {
    return (
        <nav className="navbar">
            <ul>
                <li><a href="/"><img src="https://lifetracker-ui-ai8e.onrender.com/assets/codepath-f1b3e41a.svg" /></a></li>
                <li><a href="/Activity">Activity</a></li>
                <li><a href="/Excercise">Excercise</a></li>
                <li><a href="/Nutrition">Nutrition</a></li>
                <li><a href="/Sleep">Sleep</a></li>
                {
                    isLoggedIn ? <li><a href="/"><button onClick={handleLogout}> Sign Out </button></a></li> :
                        <>
                            <li><a href="/login"><button>Login</button></a></li>
                            <li><a href="/Register"><button>Register</button></a></li>
                        </>
                }
            </ul>
        </nav>
    )
}

export default Navbar