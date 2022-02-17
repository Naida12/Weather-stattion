const express = require("express");
const https = require("https"); //internal node module to get request
const app = express();
const bodyParser = require("body-parser"); //need to install npm i body-parser//

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname));

app.get("/", function(req, res) {
  res.sendfile(__dirname+ "/index.html"); //what client will see when he visit this page//


});

app.post("/", function(req, res){

  const unit =req.body.metric;
  const apiKey="c330471b072770842c1a94030b887087";
  const query = req.body.cityName;
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit + "&lang=ru";
  https.get(url, function(response){ //calling a get method
    response.on("data",function(data){
      const weatherData=JSON.parse(data);
      const temper = weatherData.main.temp;
      const icon  = weatherData.weather[0].icon
      const imageUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
      res.write('<head><meta charset="utf-8"></head>');
      res.write("<img src=" + imageUrl + ">");
      res.write("Temperature in " + query + " is " + temper);
      res.write('<head><meta charset="utf-8"></head>');

      res.send();

    });
  });
})

app.listen(3003, function(){
  console.log("Starting server on port 3003");
});
