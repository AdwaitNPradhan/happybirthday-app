const express = require('express');
var http = require('http');
var url = require('url');
const path = require('path');
const fs = require('fs');

const pubPath = path.join(__dirname, 'public');
const port = process.env.PORT || 3000;

var app = express();

app.use(express.static(pubPath));

app.get('/', (request, response) => {

    response.send("connected<br>use\name={name}");

});
app.get('/name=*', function(req, res) {
    var pURL = req.originalUrl;
    pURL = pURL.split('=')[1];
    res.send("requested Name: " + pURL);
    // console.log(req.originalUrl);
});
app.get('*', function(req, res) {
    res.send("not found");
    // console.log(req.originalUrl);

});


app.listen(port, () => {
    // console.log('listening...');
});
