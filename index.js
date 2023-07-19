require("express-async-errors");
const dotenv = require("dotenv").config();
const app = require("./app");

const port = process.env.PORT || 5000;


app.listen(port, () => {
    console.log(`server running on port ${port}`);
});