const express = require("express");
const https = require("https");

const app = express();

app.get("/", function(req, res) {
    // res.send("Hello World");
    const url = "https://api.openweathermap.org/data/2.5/weather?q=Washington&appid=cb1816c7aad153ac8f4e7dce4929fd67&units=metric";
    https.get(url, function(response){
        console.log(response.statusCode);
        response.on("data", function(data){
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const weatherDescription = weatherData.weather[0].description;
            const City = weatherData.name;
            console.log("City Name is: " + City);
            const Country = weatherData.sys.country;
            const icon = weatherData.weather[0].description;
            const imageURL = "http://openweathermap.org/img/wn" + icon + "@2x.png"

            res.write("<h1>The Temprature at " + City +"(" + Country +") is: " + temp +" degree Celcius</h1>");
            res.write("<h2>The weather description is: " + weatherDescription + "</h2>");
            res.write("<img src=" + imageURL +">");
            res.send();
        })
    })
})


app.listen(3000, () =>{
    console.log("Listening on port 3000");
})