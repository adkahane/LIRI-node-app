var fs = require("fs");
var twitter = require("twitter");
var keys = require("./keys.js");
var command = process.argv[2];

var client = new twitter({
    consumer_key: keys.consumer_key,
    consumer_secret: keys.consumer_secret,
    access_token_key: keys.access_token_key,
    access_token_secret: keys.access_token_secret
  });

var params = {screen_name: "Mr_liri_Guy", count: "20"};

switch(command){
    case "my-tweets":
        client.get("statuses/user_timeline", params, function(error, tweets, response){
            if(error){
                return (error);
            }
            for(var i = 0; i < tweets.length; i++){
            console.log(tweets[i].text);
            console.log(tweets[i].created_at, "\n");
            }
        });
        break;
    case "spotify-this-song":
        break;
    case "movie-this":
        break;
    case "do-what-it-says":
        break;
}