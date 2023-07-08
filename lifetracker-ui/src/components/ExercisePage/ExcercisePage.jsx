import "./ExcercisePage.css"
import { useState, useEffect } from 'react'
import axios from 'axios'

function ExcercisePage({ isLoggedIn, form }) {
    //useState for the workout form
    const [workForm, setWorkForm] = useState({
        name: "",
        category: "",
        duration: "",
        intensity: "",
    })

    //useState for the results sent from the backend
    const [results, setResult] = useState([])

    //fetchData function to show the data in the frontend
    async function fetchData() {
        try {
            const result = await axios.post(`https://lifetrack-backend.onrender.com/auth/getExcercise`, { ...form })
            setResult(result?.data?.workout)
        } catch (error) {
            throw error
        }
    }
    useEffect(() => {
        async function handleGet() {
            await fetchData()
        }
        handleGet()
    }, [form])

    //function that sends workout form data to the backend
    const handleOnSubmit = async (e) => {
        e.preventDefault()
        try {
            const result = await axios.post(`https://lifetrack-backend.onrender.com/auth/Excercise`, { ...workForm, ...form })
            setResult(result?.data?.workout?.reverse())
        } catch (error) {
            throw error
        }
        setWorkForm({ name: "", category: "", duration: "", intensity: "" })
    }

    //handle the input change from the event
    const handleOnInputChange = (event) => {
        setWorkForm({ ...workForm, [event.target.name]: event.target.value })
    }


    return (
        <div className="Excercise">
            {
                isLoggedIn ?
                    <>
                        <div className="banner">
                            <h1> Excercise </h1>
                        </div>
                        <h1>Enter an Excercise</h1>
                        <div>
                            <form className="ExcerciseForm">
                                <label for="Name">Excercise Name</label><br />
                                <input type="text" placeholder="Add the name of your workout!" id="name" name="name" value={workForm.name} onChange={handleOnInputChange} /><br /><br />
                                <label for="cars">Choose a category:</label>
                                <select id="workouts" name="category" value={workForm.category} onChange={handleOnInputChange}>
                                    <option value="select">Select</option>
                                    <option value="run">Run</option>
                                    <option value="bike">Bike</option>
                                    <option value="lift">Lift</option>
                                    <option value="swim">Swim</option>
                                    <option value="sports">Sports</option>
                                </select><br /><br />
                                <label for="Duration">Duration(min)</label><br />
                                <input type="text" placeholder="How long was your workout?" id="workout" name="duration" value={workForm.duration} onChange={handleOnInputChange} /><br /><br />
                                <label for="intensity">Intensity(1-10)</label><br />
                                <input type="text" placeholder="How intense was your workout?" id="intense" name="intensity" value={workForm.intensity} onChange={handleOnInputChange} /><br /><br />
                                <button onClick={handleOnSubmit}>Submit this Excercise</button>
                            </form>
                            <h1> Previously Tracked Activities </h1>
                            {
                                results?.map((item) => {
                                    const worktime = new Date(item.worktime)
                                    const formattedDateTime = `${worktime.toLocaleDateString()} ${worktime.toLocaleTimeString()}`
                                    return (
                                        <div className="workoutCards" key={item.workoutid}>
                                            <p className="Date">Date Added: {formattedDateTime}</p>
                                            <p>Workout ID =#{item.workoutid}</p>
                                            <p>{item.name}</p>
                                            <p>Intensity: {item.intensity}/10</p>
                                            <p>Duration: {item.duration}min</p>
                                        </div>
                                    )
                                })
                            }

                        </div>
                    </>
                    :
                    <h1> Must be signed in to see your data </h1>
            }
        </div>
    )
}

export default ExcercisePage
