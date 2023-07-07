import "./SleepPage.css"

function SleepPage({ isLoggedIn }) {
    return (
        <div className="Sleep">
        {
            isLoggedIn ? 
        <>
        <div className="sleepBanner">
                <h1> Sleep </h1> 
            </div>
            <h1>You will be able to track your Sleep in a future patch!</h1>
        </>
            : <h1> Must be signed in to see your data </h1>
        }
       </div>
    )
}

export default SleepPage