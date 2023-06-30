"use strict"

/** Routes for authentication. */

const express = require("express")
const User = require("../models/user")
const router = express.Router()

//login endpoint
router.post("/login", async function (req, res, next) {
  try {
    const user = await User.login(req.body)
    if (user.error) {
        res.send(user.error);
        return res.status(400).send(user)
    }
    return res.status(200).json({ user })
  } catch (err) {
    next(err)
  }
})
//register endpoint
router.post("/register", async function (req, res, next) {
  try {
    const user = await User.register(req.body)
    if (user.error) {
        res.send(user.error)
        return res.status(400).json({ user })
    }
    return res.status(201).json({ user })
  } catch (err) {
    next(err)
  }
})

module.exports = router