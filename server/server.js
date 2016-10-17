var express = require('express');
var app = express();

// API routes configuration

// Serve static files from client
app.use(express.static(__dirname + '/../client'));

app.listen(3000);

