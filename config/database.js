const Sequelize = require("sequelize");
const sequelize = new Sequelize("note-app-db", "root", "mysecretpassword", {
  host: "localhost",
  port: 3306,
  dialect: "mysql",
});

module.exports = sequelize;
