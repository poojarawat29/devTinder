const express = require("express");
const app = express();


// get will handle request call only to specific route but use will handle request call to all the routes which it matches with first
app.get("/", (req, res) => {
    res.send("welcome to the main page");
});

app.get("/hello", (req, res) => {
    res.send("hello from the server");
});

app.get("/test", (req, res) => {
    res.send("testing");
});

app.get("/user", (req, res) => {
    res.send({ firstName: "pooja", lastName: "rawat" });
});

app.post("/user", (req, res) => {
    res.send("data has been saved in the database");
});

app.delete("/user", (req, res) => {
    res.send("data deleted from the database");
});

app.get(/ab?cd/, (req, res) => {
    res.send("b is optional");
});

app.get(/ab+cd/, (req, res) => {
    res.send("one or more b");
});

app.listen(5000, () => {
    console.log("server is running on port 5000");
});