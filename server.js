// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({echo: 'hello API'});
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});


let response = {}

app.get("/api/:input", function (req, res) {
  let input = req.params.input;

  if(Date.parse(input)){
    response['unix'] = new Date(input).getTime();
    response['utc'] = new Date(input).toUTCString(); 

  } else {
    input = parseInt(input)
    if(input){
      response['unix'] = new Date(input).getTime();
      response['utc'] = new Date(input).toUTCString();
    }else{
      response['error'] = "Invalid Date";
      }
    }
    res.json(response);
});

app.get("/api/", function (req, res) {
    response['unix'] = new Date().getTime();
    response['utc'] = new Date().toUTCString();

    res.json(response);
});
