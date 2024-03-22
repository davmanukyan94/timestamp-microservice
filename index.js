var express = require('express');
var app = express();

var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

app.use(express.static('public'));

app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


app.get("/api/timestamp", (req, res)=>{
  let date = new Date();

  return res.json({
    'unix': date.getTime(),
    'utc': date.toUTCString()
  });
});

app.get("/api/timestamp/:date", (req, res)=>{
  let resultDate='';

  let inputDate = new Date(req.params.date);

  if(inputDate.toString() == "Invalid Date"){
    inputDate = new Date(parseInt(req.params.date));
  }

  if(inputDate.toString() == "Invalid Date") {
    return res.json({error: "Invalid Date"});
  } else {
    resultDate = { unix: inputDate.getTime(),
      utc: inputDate.toUTCString() };
  }
  return res.json(resultDate);
});



var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
