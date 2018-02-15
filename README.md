# LIRI-node-app

The LIRI app is a command line node application to gather information from a user's twitter or gather information about a song or movie.

## To install, clone git repo, then open the liri folder in command line and type `npm install` to install npm packages:
* twitter
* node-spotify-api
* request

## To run application:
1. Open command line application
2. navigate to folder with application
3. type `node liri.js` followed by either
⋅⋅* `my-tweets` to see your last 20 tweets
⋅⋅* `spotify-this-song <songname>` to see information on all songs with input name
⋅⋅* `movie-this <moviename>` to see information on the input movie
⋅⋅* `do-what-it-says` to call one of the other functions based on the contents of a txt file.