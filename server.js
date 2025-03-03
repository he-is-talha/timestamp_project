const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

app.use(express.static('public'));

// Routing
app.get("/", function(req, res) {

  res.sendFile(`${__dirname}/views/index.html`);

});

app.get("/api/easteregg", function(req, res) {
  res.json({greeting: "Oh, you've found this! Well, congrats! :p"});
});

app.get("/api/timestamp", function(req, res) {

  const date = new Date();

  res.json({
    "unix": date.valueOf(),
    "utc": date.toUTCString()
  });

});

app.get("/api/timestamp/:dateParam", function(req, res) {

  let dateParam = req.params.dateParam;

  if (/^\d{5,}$/.test(dateParam))
    dateParam = parseInt(dateParam);
    
  const date = new Date(dateParam);

  if (date.toString() == "Invalid Date") {

    res.json({
      "error": "Invalid Date"
    });

  } else {

    res.json({
      "unix": date.valueOf(),
      "utc": date.toUTCString()
    });

  }

});

// No matching route
app.use(function(req, res, next) {

  res.status(404).sendFile(`${__dirname}/views/404.html`);

});

// Listening for requests
const listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
