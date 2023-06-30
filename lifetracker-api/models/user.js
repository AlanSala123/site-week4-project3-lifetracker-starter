"use strict"

//bringing in the pool, bcrypt, error requests and the work factor
const db = require("../db")
const bcrypt = require("bcrypt")
const { BCRYPT_WORK_FACTOR } = require("../config")
const crypto = require('crypto')
const jwt = require('jsonwebtoken')
const secretKey = crypto.randomBytes(64).toString('hex')


class User {
    
    //function to create a user in the database
    static _createPublicUser(user) {
        return {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          password: user.password,
          userName: user.userName
        }
      }

    //login function
    static async login(creds) {
        const {email, password } = creds
        const user = await User.fetchUserByEmail(email)
        if (user) {
          // compare hashed password to a new hash from password
          const isValid = await bcrypt.compare(password, user.password)
          if (isValid === true) {
            return User._createPublicUser(user)
          }
        }
        return {error: "Invalid username/password"}
      }

    //get the user by email  
    static async fetchUserByEmail(email) {
        const result = await db.query(
          `SELECT * FROM users WHERE email=$1`,
          [email?.toLowerCase()]
        )
        const user = result.rows[0]
        return user
      }
    
    // when a new user registers
    static async register(creds) {
        const { email, password, firstName, lastName, userName} = creds
        const existingUserWithEmail = await User.fetchUserByEmail(email)
        const userName2 = firstName + lastName // JUST FOR TESTING
        if (existingUserWithEmail) {
          return { error: 'Duplicate email'}
        }
        const hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR)
        const lowerEmail = email.toLowerCase()
        const result = await db.query(
          `INSERT INTO users (
              password,
              first_name,
              last_name,
              email,
              userName
            )
            VALUES ($1, $2, $3, $4, $5)
            RETURNING email,            
                      first_name AS "firstName", 
                      last_name AS "lastName"
                      `,
          [hashedPassword, firstName, lastName, lowerEmail, userName2]
        )
        const user = result.rows[0];
        return user
      }
      static generateAuthToken(user) {
        const payload = {
            id: user.id,
            firstname: user.firstname,
            lastname: user.lastname,
            emailaddress: user.emailaddress
        }
        const token = jwt.sign(payload, secretKey, { expiresIn: '1h' })

        return token
    }
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