"use strict"

require("dotenv").config()
require("colors")

const PORT = process.env.PORT ? Number(process.env.PORT) : 3001
const IS_TESTING = process.env.NODE_ENV === "test"

// Use dev database, testing database, or via env var, production database
function getDatabaseUri() {
  const dbUser = process.env.DATABASE_USER || "alan.salazar"
  const dbPass = process.env.DATABASE_PASS ? encodeURI(process.env.DATABASE_PASS) : "password"
  const dbHost = process.env.DATABASE_HOST || "localhost"
  const dbPort = process.env.DATABASE_PORT || 5432
  const dbTestName = process.env.DATABASE_TEST_NAME || "lifetracker_test"
  const dbProdName = process.env.DATABASE_NAME || "lifetracker"
  const dbName = process.env.NODE_ENV === "test" ? dbTestName : dbProdName
  return process.env.DATABASE_URL || `postgres://lifetracker_postgresql_0856_user:Jk0I8mo7lpQChhJcSMRBFPZ3q7wEDASc@dpg-cik9d7dph6eg6kaea5lg-a/lifetracker_postgresql_0856`
}

const BCRYPT_WORK_FACTOR = IS_TESTING ? 1 : 13

module.exports = {
  PORT,
  IS_TESTING,
  BCRYPT_WORK_FACTOR,
  getDatabaseUri,
}
