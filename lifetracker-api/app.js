"use strict"

/** Express app for lifetracker */

//import dependencies
const express = require("express")
const cors = require("cors")
const morgan = require("morgan")

//import errors and config
const { NotFoundError } = require("./utils/error")
const config = require("./config")
const app = express()
const authRoutes = require("./routes/auth")

app.use(cors())
app.use(express.json())
app.use(morgan("tiny"))

//authentication routes
app.use("/auth", authRoutes);

// health check
app.get("/", function (req, res) {
  return res.status(200).json({
    ping: "pong",
  })
})

/** Handle 404 errors -- this matches everything */
app.use(function (req, res, next) {
  return next(new NotFoundError())
})

/** Generic error handler; anything unhandled goes here. */
app.use(function (err, req, res, next) {
  if (!config.IS_TESTING) console.error(err.stack)
  const status = err.status || 500
  const message = err.message

  return res.status(status).json({
    error: { message, status },
  })
})

module.exports = app
