CREATE TABLE users (
    userID SERIAL PRIMARY KEY,
    username Varchar(100) NOT NULL,
    password Varchar(100) NOT NULL,
    first_name Varchar(100) NOT NULL,
    last_name Varchar(100) NOT NULL,
    email Varchar(100) NOT NULL
);

CREATE TABLE workouts (
    name Varchar(100) NOT NULL,
    category Varchar(100) NOT NULL,
    workoutID SERIAL PRIMARY KEY,
    duration Varchar(100) NOT NULL,
    intensity Varchar(100) NOT NULL,
    worktime TIMESTAMP NOT NULL DEFAULT NOW(),
    userID INT NOT NULL,
    FOREIGN KEY (userID) REFERENCES users(userID)
);
