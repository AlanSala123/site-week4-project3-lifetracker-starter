import "./Home.css"

function Home() {
    return (
        <div className="Home">
            <div className="Hero">
                <div>
                    <h1> Lifetracker </h1>
                    <p>This website helps track your life!</p>
                </div>
                <img src="https://lifetracker-ui-ai8e.onrender.com/assets/tracker-2a96bfd0.jpg" width="300" height="300" />
            </div>
            <div className="belowText">
                <p>Fitness</p>
                <p>Sleep</p>
                <p>Nutrition</p>
            </div>
            <div className="belowPics">
                <img src="https://media.istockphoto.com/id/1366052585/photo/shot-of-a-group-of-friends-hanging-out-before-working-out-together.jpg?s=612x612&w=0&k=20&c=rj7LgjUuXde0eLWikS1rvDnsKDdBotgsy9eM5HDzko0=" width="400" height="300" />
                <img src="https://biostrap.com/wp-content/uploads/2022/02/big-stretch-2.png" width="400" height="300" />
                <img src="https://images.squarespace-cdn.com/content/v1/56de134c4d088e5a281db43a/1592192355221-ZOMZZJHLAI39KJEQBBBF/Friends%2Bcooking%2Btogether.jpg?format=1000w" width="400" height="300" />
            </div>
        </div>
    )
}

export default Home
