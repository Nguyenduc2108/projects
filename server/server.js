const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./src/config/connectDB");
const authRouter = require("./src/routes/authRouter");
require("./passport");

const app = express();
app.use(
    cors({
        origin: process.env.URL_CLIENT,
    })
);

app.use(express.json);
app.use(express.urlencoded({ extended: true }));

// test server
app.use("/", (req, res) => {
    res.send("app run");
});
app.use("/api/auth", authRouter);

connectDB();

const port = process.env.PORT || 8888;

app.listen(port, () => {
    console.log(`Server is running on the port ` + port);
});
