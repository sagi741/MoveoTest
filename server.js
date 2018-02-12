/**
 * Created by sagifridman on 07/02/2018.
 */

const express = require('express');
const app = express();
const cheerio = require('cheerio');
const request = require('request');
const path = require('path');
const bodyParser = require('body-parser');

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

var fs = require('fs');
var time = time;
var localtime = 0;
var temp = 0;

const baseUrl = 'https://www.timeanddate.com';
const SearchUrl ='https://www.timeanddate.com/weather/'




app.get('/', (req, res) => {
    search('Ashdod', (error, ashdodData) => {
        if (error) throw error;
        search('New York', (error2, telAvivData) => {
            if(error2) throw error2;
            res.render('index', {cities: [ashdodData, telAvivData]})
        })
    })
});


app.post('/search', (req,res)=>{
    console.log('igothere');
    var searchQuery = req.body.query;
    var serachButton = `${SearchUrl}`;
    search(searchQuery, function (err, data) {
        //res.render('results', data)
        res.json(data);
    });
})


function search(query, callback) {
    let fetchUrl = `${baseUrl}/weather/results.html`;
    request(fetchUrl, {qs: {query: query}}, function (error, response, html) {
        if (!error && response.statusCode == 200) {
            var $ = cheerio.load(html);
            var a = $('.fixed tbody tr a').get(0);
            var href = a.attribs.href;
            getCityTempr(baseUrl + href, callback); // transfer to orignal function.
        }
        else {
            callback(error);
        }
    });
}

function getCityTempr(shortUrl, callback) {

    request(shortUrl, function (error, response, html) {
        if (!error && response.statusCode == 200) {
            var $ = cheerio.load(html);
            var cities = [];

            var qlook = $('#qlook');
            var location = $('.fixed > h1').text();
            var temp = qlook.find('.h2').text();
            var icon = qlook.find('#cur-weather').get(0).attribs.src;
            var humidity = $('#qfacts p:nth-child(7)').text();
            var windspeed = $('#qlook p').text();

            callback(null, {
                location: location,
                temp: temp,
                humidity: humidity,
                windspeed: windspeed,
                weatherIconUrl: icon
            });
        } else {
            callback(error);
        }

    })
};


app.listen(8080, () => console.log('Open the local host on port : 8080!'))

