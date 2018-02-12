var fs = require("fs");
var twitter = require("twitter");
var keys = require("./keys.js");

var client = new twitter({
    consumer_key: keys.consumer_key,
    consumer_secret: keys.consumer_secret,
    access_token_key: keys.access_token_key,
    access_token_secret: keys.access_token_secret
  });

if (process.argv[2] === "my-tweets"){
    client.get("https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=Mr_liri_Guy&count=20", function(error, tweets, response){
        if(error){
            return (error);
        }
        for(var i = 0; i < tweets.length; i++){
        console.log(tweets[i].text);
        console.log(tweets[i].created_at, "\n");
        }
    });
}