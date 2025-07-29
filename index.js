// index.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

app.get("/api/:date?", function (req, res) {
  var date = req.params.date;
  if (!date) {
    // Nếu không có tham số ngày, trả về thời gian hiện tại
    var now = new Date();
    var unix = now.getTime();
    var utc = now.toUTCString();
    res.json({ unix: unix, utc: utc });
  } else {
    // Kiểm tra xem tham số ngày có phải là số hay không
    var isNumber = !isNaN(Number(date));
    if (isNumber) {
      // Nếu là số, sử dụng nó để tạo ra một đối tượng Date
      var unix = Number(date);
      var utc = new Date(unix).toUTCString();
      res.json({ unix: unix, utc: utc });
    } else {
      // Nếu có tham số ngày, kiểm tra tính hợp lệ
      var isValidDate = !isNaN(new Date(date).getTime());
      if (isValidDate) {
        // Nếu ngày hợp lệ, trả về đối tượng JSON với unix và utc
        var unix = new Date(date).getTime();
        var utc = new Date(date).toUTCString();
        res.json({ unix: unix, utc: utc });
      } else {
        // Nếu ngày không hợp lệ, trả về đối tượng JSON với lỗi
        res.json({ error: "Invalid Date" });
      }
    }
  }
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
