import "./ActivityPage.css"

function ActivityPage({ isLoggedIn, userName }) {
    return (
       <div className="Activity">
        {
            isLoggedIn ? <h1>Welcome User: {userName} </h1> : <h1> Must be signed in to see your data </h1>
        }
       </div>
    )
}

export default ActivityPage