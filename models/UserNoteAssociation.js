// associations.js
const User = require("./user")
const Note = require("./note")

// Define associations
User.hasMany(Note, { foreignKey: "user_id" })
Note.belongsTo(User, { foreignKey: "user_id" })

// Export the models with associations
module.exports = { User, Note }
