import "./ActivityPage.css"
import { Link } from 'react-router-dom'

function ActivityPage({ isLoggedIn, userName }) {
    return (
        <div className="Activity">
            {
                isLoggedIn ?
                    <>
                        <h1>Welcome User: {userName} </h1>
                        <h1> Activity Feed </h1>
                        <div className="difPages">
                            <Link to={"/Excercise"} >
                                <button className="button"> Log Excercise </button>
                            </Link>
                            <Link to={"/Sleep"} >
                                <button className="button"> Log Sleep </button>
                            </Link>
                            <Link to={"/Nutrition"} >
                                <button className="button"> Log Nutrition </button>
                            </Link>
                        </div>
                        <div className="ActivityFeed">
                            <div className="excercise">
                                <p> Excercise </p>
                                <p> Total Excercise Minutes: </p>
                            </div>
                            <div className="nutrition">
                                <p>Nutrition</p>
                                <p>Average Daily Calories: 0</p>
                            </div>
                            <div className="Sleeps">
                                <p>Sleep</p>
                                <p>Average hours of Sleep: 0</p>
                            </div>
                        </div>
                    </>
                    : <h1> Must be signed in to see your data </h1>
            }
        </div>
    )
}

export default ActivityPage