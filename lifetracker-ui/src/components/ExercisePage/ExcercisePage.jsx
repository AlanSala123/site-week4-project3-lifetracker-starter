import "./ExcercisePage.css"

function ExcercisePage({ isLoggedIn }) {
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
                                <input type="text" placeholder="Add the name of your workout!" id="Name" name="Name" /><br /><br />
                                <label for="cars">Choose a category:</label>
                                <select id="workouts" name="workouts">
                                    <option value="run">run</option>
                                    <option value="bike">bike</option>
                                    <option value="lift">lift</option>
                                    <option value="swim">swim</option>
                                    <option value="sports">sports</option>
                                </select><br/><br/>
                                <label for="Duration">Duration(min)</label><br />
                                <input type="text" placeholder="How long was your workout?" id="workout" name="workout" /><br /><br />
                                <label for="intensity">Intensity(1-10)</label><br />
                                <input type="text" placeholder="How intense was your workout?" id="intense" name="intense" /><br /><br />
                                <button>Submit this Excercise</button>
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