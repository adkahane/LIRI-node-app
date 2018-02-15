// Variables
var fs = require("fs");
var twitter = require("twitter");
var Spotify = require("node-spotify-api");
var request = require("request");
var keys = require("./keys.js");
var command = process.argv[2];
var songName = "the sign ace of base";
var movieName = "Mr Nobody";

// Twitter keys and tokens
var client = new twitter({
    consumer_key: keys[0].consumer_key,
    consumer_secret: keys[0].consumer_secret,
    access_token_key: keys[0].access_token_key,
    access_token_secret: keys[0].access_token_secret
});
// Spotify keys and tokens
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

// Displays last 20 tweets when called
function myTweets() {
    client.get("statuses/user_timeline", params, function(error, tweets, response){
        if(error){
            return (error);
        }
        for(var i = 0; i < tweets.length; i++){
            console.log(tweets[i].text);
            console.log(tweets[i].created_at, "\n");
        }
        // Writes to log.txt file
        fs.appendFile("./log.txt", "\n" + new Date().toISOString().replace('T', ' ').substr(0, 19) + " ==> looked at your last 20 Tweets\n--------------------------------------------------------------------", function(err){
            if(err){
                throw err;
            }
        });
    });
}

// Displays information on 10 songs with the queried name
function spotifyThis() {

    // Gets user input if available
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

        // Loop to display all songs
        for (var i = 0; i < data.tracks.items.length; i++) {
            console.log((i+1) + ".\n" + "Band: " + data.tracks.items[i].album.artists[0].name);
            console.log("Album: " + data.tracks.items[i].album.name);
            console.log("Preview URL: " + data.tracks.items[i].external_urls.spotify + "\n");
        }
        fs.appendFile("./log.txt", "\n" + new Date().toISOString().replace('T', ' ').substr(0, 19) + " ==> looked up '" + songName + "' on Spotify\n--------------------------------------------------------------------", function(err){
            if(err){
                throw err;
            }
        });
    });
}

// Displays OMDB information on queried movie title
function movieThis(){
    if (process.argv.length > 3){
        movieName = "";
        for (var i = 3; i < process.argv.length; i++){
            movieName += process.argv[i] + "+";
        }
    }

    request("http://www.omdbapi.com/?t=" + movieName + "&apikey=40e9cece", function(error, response, body) {
        // Check for error from API call
        if (!error && response.statusCode === 200) {
            // Check to see if the movie input was found
            if(JSON.parse(body).Response === "False"){
                console.log(JSON.parse(body).Error);
            }
            // Check to see if any of the individual data elements return 'undefined'
            else if (typeof JSON.parse(body).Title === "undefined" || typeof JSON.parse(body).Year === "undefined" || typeof JSON.parse(body).Ratings[0] === "undefined" || typeof JSON.parse(body).Ratings[1] === "undefined" || typeof JSON.parse(body).Country === "undefined" || typeof JSON.parse(body).Language === "undefined" || typeof JSON.parse(body).Plot === "undefined" || typeof JSON.parse(body).Actors === "undefined") {
                console.log("Sorry, missing information on that title");
            }
            else {
                console.log("Movie Title: " + JSON.parse(body).Title + "\nYear: " + JSON.parse(body).Year + "\nIMDB Rating: " + JSON.parse(body).Ratings[0].Value + "\nRotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value + "\nMade in: " + JSON.parse(body).Country + "\nLanguage: " + JSON.parse(body).Language + "\nPlot: " + JSON.parse(body).Plot + "\nActors: " + JSON.parse(body).Actors);
            }
        }
        fs.appendFile("./log.txt", "\n" + new Date().toISOString().replace('T', ' ').substr(0, 19) + " ==> Looked up the movie '" + movieName + "' on OMDB\n--------------------------------------------------------------------", function(err){
            if(err){
                throw err;
            }
        });
    });

}

// When called, checks the random.txt file and makes a new call based on it's contents
function doThis(){
    fs.appendFile("./log.txt", "\n" + new Date().toISOString().replace('T', ' ').substr(0, 19) + " ==> Ran the do-what-it-says function\n--------------------------------------------------------------------", function(err){
        if(err){
            throw err;
        }
    });
    
    fs.readFile("./random.txt", "utf8", function(err, data){
        // Split the contents of random.txt at the ','
        var random = data.split(",");
        // Makes command equal to the first half of the text in random.txt
        command = random[0];
        //Conditionals to set songName and movieName to their new values if those functions will be called by random.txt
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

// Initiall check to see which function to call
logic();