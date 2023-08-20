const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
const sequelize = require("./config/database");
const cookieParser = require("cookie-parser");

// Load env variables
// dotenv.config({ path: "./config/config.env" })
// dotenv.config({ path: "./config/key.env" })

// Importing Middlewares\
const helmet = require("helmet");
const xssClean = require("xss-clean");
const hpp = require("hpp");
const cors = require("cors");

// Importing Routes

// DB
sequelize
  .authenticate()
  .then(() => console.log("Database connected"))
  .catch((err) => console.error("Error:", err));

const app = express();

// Body Parser
app.use(express.json());
// Set security headers
app.use(helmet());
// Prevent XSS
app.use(xssClean());
// hpp for security
app.use(hpp());
// Cookie Parser
app.use(cookieParser());
// Enable Cors
app.use(cors());

// Mount Routers

// Error Handler

// Server Config
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`.blue.bold);
});
