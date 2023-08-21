const { DataTypes } = require("sequelize")
const { sequelize } = require("../config/database")

const Note = sequelize.define("Note", {
	title: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	content: {
		type: DataTypes.TEXT,
		allowNull: false,
	},
	user_id: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
})

module.exports = Note
