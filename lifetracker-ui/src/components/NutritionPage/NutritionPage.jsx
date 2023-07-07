import "./NutritionPage.css"
import { useState, useEffect } from 'react'
import axios from 'axios'

function NutritionPage({ isLoggedIn, form }) {

     //useState for the Nutrition form
     const [nutritionForm, setNutritionForm] = useState({
        name: "",
        category: "",
        calories: "",
        quantity: "",
        url: ""
    })

    //useState for the results sent from the backend
    const [results, setResult] = useState([])

    //handleGet function
    async function fetchData() {
        try {
            const result = await axios.post(`http://localhost:3001/auth/getNutrition`, {...form})
            setResult(result?.data?.food);
        } catch (error) {
            throw error;
        }
    }
    useEffect(() => {
        async function handleGet() {
            await fetchData()
        }
        handleGet();
    },[form])

     //function that is run whenever someone presses to submit their excercise
     const handleOnSubmit = async (e) => {
        e.preventDefault()
        try {
            const result = await axios.post(`http://localhost:3001/auth/Nutrition`, { ...nutritionForm, ...form })
            setResult(result?.data?.food?.reverse())
        } catch (error) {
            throw error
        }
        setNutritionForm({ name: "", category: "", calories: "", quantity: "", url: ""})
    }

    //handle the input change from the event
    const handleOnInputChange = (event) => {
        setNutritionForm({ ...nutritionForm, [event.target.name]: event.target.value })
    }

    return (
        <div className="Nutrition">
            {
                isLoggedIn ?
                    <>
                        <div className="NutritionBanner">
                            <h1> Nutrition </h1>
                        </div>
                        <div>
                            <h1>Enter Your Nutrition</h1>
                            <form className="NutritionForm">
                                <label for="Name"> Name </label><br />
                                <input type="text" placeholder="Add the name of your food!" id="name" name="name" value={nutritionForm.name} onChange={handleOnInputChange}/><br /><br />
                                <label for="cars">Choose a category:</label>
                                <select id="workouts" name="category" value={nutritionForm.category} onChange={handleOnInputChange}>
                                    <option value="select">Select</option>
                                    <option value="run">Snack</option>
                                    <option value="bike">Beverage</option>
                                    <option value="lift">Food</option>
                                </select><br /><br />
                                <label for="Quantity"> Quantity </label><br />
                                <input type="text" placeholder="Quantity of your food?" id="quant" name="quantity" value={nutritionForm.quantity} onChange={handleOnInputChange}/><br /><br />
                                <label for="Calories"> Calories </label><br />
                                <input type="text" placeholder="How many calories was your food?" id="cal" name="calories" value={nutritionForm.calories} onChange={handleOnInputChange} /><br /><br />
                                <label for="url"> image url </label><br />
                                <input type="text" placeholder="Provide an image for your food!" id="url" name="url" value={nutritionForm.url} onChange={handleOnInputChange} /><br /><br />
                                <button onClick={handleOnSubmit}> Submit this food </button>
                            </form>
                            <h1> Previosly Tracked Nutrition </h1>
                            {
                                results?.map((item) => {
                                    const nutritiontime = new Date(item.nutritiontime)
                                    const formattedDateTime = `${nutritiontime.toLocaleDateString()} ${nutritiontime.toLocaleTimeString()}`
                                    return (
                                        <div className="workoutCards" key={item.nutritionID}>
                                            <p className="Date">Date Added: {formattedDateTime}</p>
                                            <p>Nutrition ID =#{item.nutritionid}</p>
                                            <p>{item.name}</p>
                                            <p>Quantity: {item.quantity}</p>
                                            <p>Calories: {item.calories}</p>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </>
                    : <h1> Must be signed in to see your data </h1>
            }
        </div>
    )
}

export default NutritionPage
