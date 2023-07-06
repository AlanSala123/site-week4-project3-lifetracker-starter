import "./ActivityPage.css"
import { Link } from 'react-router-dom'

function ActivityPage({ isLoggedIn, userName }) {
    return (
        <div className="Activity">
            {
                isLoggedIn ?
                    <>
                        <h1>Welcome User: {userName} </h1>
                        <div className="difPages">
                            <Link to={"/Excercise"} >
                                <button> Log Excercise </button>
                            </Link>
                            <Link to={"/Sleep"} >
                                <button> Log Sleep </button>
                            </Link>
                            <Link to={"/Nutrition"} >
                                <button> Log Nutrition </button>
                            </Link>
                        </div>
                        <div className="ActivityFeed">
                            <div className="excercise">
                                <p> Excercise </p>
                                <p> Minutes worked out: </p>
                            </div>
                        </div>
                    </>
                    : <h1> Must be signed in to see your data </h1>
            }
        </div>
    )
}

export default ActivityPage