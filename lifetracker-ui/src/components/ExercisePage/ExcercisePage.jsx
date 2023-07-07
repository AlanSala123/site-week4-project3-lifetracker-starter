import "./ExcercisePage.css"
import { useState } from 'react'
import axios from 'axios'

function ExcercisePage({ isLoggedIn, form, setForm }) {
    //useState for the workout form
    const [workForm, setWorkForm] = useState({
        name: "",
        category: "",
        duration: "",
        intensity: "",
    })

    //useState for the results sent from the backend
    const [results, setResult] = useState([])

    //function that is run whenever someone presses to submit their excercise
    const handleOnSubmit = async (e) => {
        e.preventDefault();
        console.log(workForm); //MAKE SURE TO GET RID OF THIS
        try {

            const result = await axios.post(`http://localhost:3001/auth/Excercise`, { ...workForm, ...form })
            setResult(result)

        } catch (error) {
            throw error
        }
        setWorkForm({ name: "", category: "", duration: "", intensity: "" });
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
                                results?.data?.workout?.reverse().map((item) => {
                                    const worktime = new Date(item.worktime);
                                    const formattedDateTime = `${worktime.toLocaleDateString()} ${worktime.toLocaleTimeString()}`;

                                    return (
                                        <div className="workoutCards" key={item.workoutid}>
                                            <p>Date Added: {formattedDateTime}</p>
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