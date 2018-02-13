var fs = require("fs");
var twitter = require("twitter");
var Spotify = require("node-spotify-api");
var request = require("request");
var keys = require("./keys.js");
var command = process.argv[2];
var songName = "";

var client = new twitter({
    consumer_key: keys[0].consumer_key,
    consumer_secret: keys[0].consumer_secret,
    access_token_key: keys[0].access_token_key,
    access_token_secret: keys[0].access_token_secret
});

var spotify = new Spotify({
    id: keys[1].client_id,
    secret: keys[1].client_secret
});

var params = {screen_name: "Mr_liri_Guy", count: "20"};

switch(command){
    case "my-tweets":
        myTweets();
        break;
    case "spotify-this-song":
        spotifyThis();
        break;
    // case "movie-this":
    //     movieThis();
    //     break;
    // case "do-what-it-says":
    //     doThis();
    //     break;
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
    for (var i = 3; i < process.argv.length; i++){
        songName += process.argv[i] + " ";
    }
    spotify.search({ type: 'track', query: songName, limit: 15 }, function(err, data) {
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