const express = require("express");
const connectDb = require ("./config/dbConnection");
connectDb();


const errorHandler = require("./middleware/errorHandler");

const app = express();
const basePath = "/api/v1"

app.use(express.json());
app.use(`/api/v1/contacts`, require("./routes/intro.routes"));
app.use(`/api/v1/users`, require("./routes/userRoutes"));

app.get(`/api/v1/docs`, (req, res) => {

    res.redirect("https://documenter.getpostman.com/view/28028237/2s9XxsUFzY");
});

app.use(errorHandler);

module.exports = app;