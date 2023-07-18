const express = require("express");
const connectDb = require ("./config/dbConnection");
connectDb();


const errorHandler = require("./middleware/errorHandler");

const app = express();

app.use(express.json());
app.use("api/contacts", require("./routes/intro.routes"));
app.use(errorHandler);

module.exports = app;