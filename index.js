// index.js
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
  res.json({greeting: 'hello API'});
});

//The date API endpoint
app.get("/api/:date?", function(req, res) {
  let date = req.params.date;
  const dateObject = new Date();

  if (date == null) {
    res.json({unix: dateObject.getTime() ,utc: dateObject.toUTCString()});
    return;
  }

  if(!(date.includes("-") || date.includes(","))) {
      console.log("Parse int started");
      let dateInt = parseInt(date);
      if(isNaN(dateInt)) {
        res.json({error: "Invalid Date"});
        return;
      }
      const dateObject = new Date(dateInt);
      res.json({unix: dateObject.getTime() ,utc: dateObject.toUTCString()});
      return;
  } else {
      const dateObject = new Date(date);
      if(dateObject.toDateString() === "Invalid Date") {
        res.json({error: "Invalid Date"});
        return;
      }
      res.json({unix: dateObject.getTime() ,utc: dateObject.toUTCString()});
      return;
  }
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
