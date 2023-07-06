import "./ExcercisePage.css"
import  { useState } from 'react'
import axios from 'axios'

function ExcercisePage({ isLoggedIn }) {
    //useState for the workout form
    const[workForm, setWorkForm] = useState({
        name:"",
        category:"",
        duration:"",
        intensity:"", 
    })

    //function that is run whenever someone presses to submit their excercise
    const handleOnSubmit = async (e) => {
        e.preventDefault();
        console.log(workForm);
        try {
            const result = await axios.post(`http://localhost:3001/auth/Excercise`, workForm)
        } catch (error) {
            throw error
        }
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
                                <input type="text" placeholder="Add the name of your workout!" id="name" name="name" value={workForm.name} onChange={handleOnInputChange}/><br /><br />
                                <label for="cars">Choose a category:</label>
                                <select id="workouts" name="category" value={workForm.category} onChange={handleOnInputChange}>
                                    <option value="select">select</option>
                                    <option value="run">run</option>
                                    <option value="bike">bike</option>
                                    <option value="lift">lift</option>
                                    <option value="swim">swim</option>
                                    <option value="sports">sports</option>
                                </select><br/><br/>
                                <label for="Duration">Duration(min)</label><br />
                                <input type="text" placeholder="How long was your workout?" id="workout" name="duration" value={workForm.duration} onChange={handleOnInputChange}/><br /><br />
                                <label for="intensity">Intensity(1-10)</label><br />
                                <input type="text" placeholder="How intense was your workout?" id="intense" name="intensity" value={workForm.intensity} onChange={handleOnInputChange}/><br /><br />
                                <button onClick={handleOnSubmit}>Submit this Excercise</button>
                            </form>
                        </div>
                    </>
                    :
                    <h1> Must be signed in to see your data </h1>
            }
        </div>
    )
}

export default ExcercisePage