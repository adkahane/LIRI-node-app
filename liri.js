// Variables
var fs = require("fs");
var twitter = require("twitter");
var Spotify = require("node-spotify-api");
var request = require("request");
var keys = require("./keys.js");
var command = process.argv[2];
var songName = "the sign ace of base";
var movieName = "Mr Nobody";

// Gets twitter keys and tokens
var client = new twitter({
    consumer_key: keys[0].consumer_key,
    consumer_secret: keys[0].consumer_secret,
    access_token_key: keys[0].access_token_key,
    access_token_secret: keys[0].access_token_secret
});
// Gets spotify keys and tokens
var spotify = new Spotify({
    id: keys[1].client_id,
    secret: keys[1].client_secret
});
// Twitter API call parameters
var params = {screen_name: "Mr_liri_Guy", count: "20"};

// The program logic
function logic(){
    switch(command){
        case "my-tweets":
            myTweets();
            break;
        case "spotify-this-song":
            spotifyThis();
            break;
        case "movie-this":
            movieThis();
            break;
        case "do-what-it-says":
            doThis();
            break;
    }        
}

function myTweets() {
    client.get("statuses/user_timeline", params, function(error, tweets, response){
        if(error){
            return (error);
        }
        for(var i = 0; i < tweets.length; i++){
        console.log(tweets[i].text);
        console.log(tweets[i].created_at, "\n");
        }
    });
}

function spotifyThis() {
    if (process.argv.length > 3) {
        songName = "";
        for (var i = 3; i < process.argv.length; i++){
            songName += process.argv[i] + " ";
        }
    }
    spotify.search({ type: 'track', query: songName, limit: 10 }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
        console.log("Song Name: " + songName +"\n");
        console.log("Versions:\n");
        for (var i = 0; i < data.tracks.items.length; i++) {
            console.log((i+1) + ".\n" + "Band: " + data.tracks.items[i].album.artists[0].name);
            console.log("Album: " + data.tracks.items[i].album.name);
            console.log("Preview URL: " + data.tracks.items[i].external_urls.spotify + "\n");
        }
    });
}

function movieThis(){
    if (process.argv.length > 3){
        movieName = "";
        for (var i = 3; i < process.argv.length; i++){
            movieName += process.argv[i] + "+";
        }
    }

    request("http://www.omdbapi.com/?t=" + movieName + "&apikey=40e9cece", function(error, response, body) {

        if (!error && response.statusCode === 200) {
            if(JSON.parse(body).Response === "False"){
                console.log(JSON.parse(body).Error);
            }
            else {
                console.log("Movie Title: " + JSON.parse(body).Title + "\nYear: " + JSON.parse(body).Year + "\nIMDB Rating: " + JSON.parse(body).Ratings[0].Value + "\nRotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value + "\nMade in: " + JSON.parse(body).Country + "\nLanguage: " + JSON.parse(body).Language + "\nPlot: " + JSON.parse(body).Plot + "\nActors: " + JSON.parse(body).Actors);
            }
        }
    });

}

function doThis(){
    fs.readFile("./random.txt", "utf8", function(err, data){
        var random = data.split(",");
        command = random[0];
        if (command === "spotify-this-song"){
            songName = random[1];
            logic();
        }
        else if(command === "movie-this"){
            movieName = random[1];
            logic();
        }
        else {
            logic();
        }
    });
}

// Initially runs the program
logic();