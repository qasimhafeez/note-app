const { DataTypes } = require("sequelize");
const sequelize = require("./database");
const User = require("./user");

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
    references: {
      model: User,
      key: "id",
    },
  },
});

// Define associations
Note.belongsTo(User, { foreignKey: "user_id" });

module.exports = Note;
