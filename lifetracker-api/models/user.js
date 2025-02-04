"use strict"

//importing everything needed for the user model
const db = require("../db")
const bcrypt = require("bcrypt")
const { BCRYPT_WORK_FACTOR } = require("../config")
const crypto = require('crypto')
const jwt = require('jsonwebtoken')
const secretKey = crypto.randomBytes(64).toString('hex')


class User {

  //function to create a user 
  static _createPublicUser(user) {
    return {
      userID: user.userid,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: user.password,
      userName: user.userName
    }
  }

  //login function
  static async login(creds) {
    const { email, password } = creds
    const user = await User.fetchUserByEmail(email)
    if (user) {
      // compare hashed password to a new hash from password
      const isValid = await bcrypt.compare(password, user.password)
      if (isValid === true) {
        return User._createPublicUser(user)
      }
    }
    return { error: "Invalid username/password" }
  }

  //Get the user given their email
  static async fetchUserByEmail(email) {
    const result = await db.query(
      `SELECT * FROM users WHERE email=$1`,
      [email?.toLowerCase()]
    )
    const user = result.rows[0]
    return user
  }

  // Function for When a new user registers
  static async register(creds) {
    const { email, password, firstName, lastName, userName } = creds
    const existingUserWithEmail = await User.fetchUserByEmail(email)
    //check if their email is already in the database
    if (existingUserWithEmail) {
      return { error: 'Duplicate email' }
    }
    const hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR)
    const lowerEmail = email.toLowerCase()
    const result = await db.query(
      `INSERT INTO users (
              password,
              first_name,
              last_name,
              email,
              username
            )
            VALUES ($1, $2, $3, $4, $5)
            RETURNING email,            
                      first_name AS "firstName", 
                      last_name AS "lastName",
                      username AS "userName"
                      `,
      [hashedPassword, firstName, lastName, lowerEmail, userName]
    )
    const user = result.rows[0]
    return user
  }

  //Function to add nutrition
  static async addNutrition(info) {
    const { name, category, quantity, calories, url, email } = info
    const user = await User.fetchUserByEmail(email)
    const { userid } = user

    //we want to add to the nutrition database
    const result = await db.query(
      `INSERT INTO nutritions (
              name,
              category,
              quantity,
              calories,
              url,
              userID
          )
          VALUES($1, $2, $3, $4, $5, $6)
          RETURNING name,            
                    category, 
                    quantity,
                    calories,
                    url,
                    userID
                    `,
      [name, category, quantity, calories, url, userid]
    )
    //get all the nutrition for a specific user
    const all = await User.fetchAllNutritions(userid)
    return all
  }

  //Function that grabs all the nutrition
  static async getAllNutrition(info) {
    const { email } = info;
    const user = await User.fetchUserByEmail(email);
    const { userid } = user

    //querying through the nutritions table WHERE userID matches userID from table
    const result = await db.query(
      `SELECT * FROM nutritions WHERE userid=$1`, [userid]
    )
    return result.rows
  }

  //Function to get all the nutritions for a specific user
  static async fetchAllNutritions(userid) {
    //querying through the workout table WHERE userID matches userID from table
    const result = await db.query(
      `SELECT * FROM nutritions WHERE userid=$1`, [userid]
    )
    return result.rows
  }

  //Function to add a workout to the workout database
  static async addWorkout(info) {
    const { name, category, duration, intensity, email } = info
    const user = await User.fetchUserByEmail(email)
    const { userid } = user
    //we want to add to the workout database
    const result = await db.query(
      `INSERT INTO workouts (
              name,
              category,
              duration,
              intensity,
              userID
          )
          VALUES($1, $2, $3, $4, $5)
          RETURNING name,            
                    category, 
                    duration,
                    intensity,
                    userID
                    `,
      [name, category, duration, intensity, userid]
    )
    //get all the workouts for a specific user
    const all = await User.fetchAllWorkouts(userid)
    return all
  }

  static async getAllWorkouts(info) {
    //get all workouts
    const { email } = info;
    const user = await User.fetchUserByEmail(email);
    const { userid } = user;

    //querying through the workout table WHERE userID matches userID from table
    const result = await db.query(
      `SELECT * FROM workouts WHERE userid=$1`, [userid]
    )
    return result.rows
  }

  //Function to get all the workouts for a specific user
  static async fetchAllWorkouts(userid) {
    //querying through the workout table WHERE userID matches userID from table
    const result = await db.query(
      `SELECT * FROM workouts WHERE userid=$1`, [userid]
    )
    return result.rows
  }

  //Get the user information by their id
  static async getById(id) {
    const { rows } = await db.query('SELECT * FROM users WHERE id = $1', [id])
    return rows[0]
  }

  //Generate authorization token
  static generateAuthToken(user) {
    const payload = {
      id: user.id,
      firstname: user.firstName,
      lastname: user.lastName,
      emailaddress: user.email,
      username: user.userName
    }
    const token = jwt.sign(payload, secretKey, { expiresIn: '1h' })
    return token
  }
  //Verify Authorization Token
  static verifyAuthToken(token) {
    try {
      const decoded = jwt.verify(token, secretKey)
      return decoded
    } catch (err) {
      return null
    }
  }
}
module.exports = User
