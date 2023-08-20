const { DataTypes } = require("sequelize");
const sequelize = require("./database");
const Note = require("./note");

const User = sequelize.define("User", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// Define associations
User.hasMany(Note, { foreignKey: "user_id" });

module.exports = User;
