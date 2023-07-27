const express = require("express");
const connectDb = require ("./config/dbConnection");
connectDb();


const errorHandler = require("./middleware/errorHandler");

const app = express();
const basePath = "/api/v1"

app.use(express.json());
app.use(`${basePath}/contacts`, require("./routes/intro.routes"));
app.use(`${basePath}/users`, require("./routes/userRoutes"));

app.get(`${basePath}/docs`, (req, res) => {

    res.redirect("http://localhost:5002/api/users");
});

app.use(errorHandler);

module.exports = app;