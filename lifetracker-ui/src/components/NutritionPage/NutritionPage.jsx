import "./NutritionPage.css"

function NutritionPage({ isLoggedIn }) {
    return(
        <div className="Nutrition">
        {
            isLoggedIn ? 
        <>
        <div className="NutritionBanner">
                <h1> Nutrition </h1> 
            </div>
            <h1>You will be able to track your Nutrition in a future patch!</h1>
        </>
            : <h1> Must be signed in to see your data </h1>
        }
       </div>
    )
}

export default NutritionPage