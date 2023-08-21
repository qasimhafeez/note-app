const Sequelize = require("sequelize")
const redis = require("redis")
const REDIS_PORT = 6379

// sequelize client
const sequelize = new Sequelize("note-app-db", "root", "mysecretpassword", {
	host: "localhost",
	port: 3306,
	dialect: "mysql",
})

// redis client
const redisClient = redis.createClient(REDIS_PORT)

// export modules
module.exports = {
	sequelize,
	redisClient,
}
