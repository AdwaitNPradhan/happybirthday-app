// jshint esversion: 6
const express = require("express");
const { response } = require("express");
const hbs = require("hbs");
const fs = require("fs");
var app = express(); //creating a pp object for express framework


app.set("view engine", "hbs");
const port = process.env.PORT || 3000; //auto configuring the port to listen on
app.use(express.static('./views/res'));
app.use((request, response, next) => {
    //logging function for all the connections or requests made

    var now = new Date().toISOString().slice(0, 10);

    var pURL = request.originalUrl;
    if (pURL != "/favicon.ico" && pURL.startsWith("/name=")) {
        var name = pURL.split("=")[1];
        var log = `On :${now}: Birthday greet request for [${name}] | urlADD: {${request.url}}`; //log scheme

        console.log(log);
        fs.appendFile("server.log", log + "\n", (err) => {
            if (err) {
                console.log("Unable to append to server logs!");
            }
        });
    }
    next();
});

app.get("/", (request, response) => {
    response.send("connected<br>use\\name={name}");
});
app.get("/name=*", function(req, res) {
    var pURL = req.originalUrl; //getting the url of the current request made
    var name = pURL.split("=")[1]; //looking for /name=yourname
    name = name.replace(/%20/g, ' ');

    res.render("greet.hbs", {
        //rendering the hbs file and passing var name for placeholder replacement
        vname: name
    });


    console.log("requested Name: " + name);
});
app.get("*", function(req, res) {
    //if the url is not what the app intended to get
    res.send("not found");
    console.log(req.originalUrl);
});

app.listen(port, () => {
    console.log("listening...");
});