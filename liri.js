var fs = require("fs");
var twitter = require("twitter");
var keys = require("./keys.js")

var client = new twitter({
    consumer_key: keys.consumer_key,
    consumer_secret: keys.consumer_secret,
    access_token_key: keys.access_token_key,
    access_token_secret: keys.access_token_secret
  });
console.log(client);