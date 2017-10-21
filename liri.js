//var tKeys = require('./Keys.js');
//console.log(tKeys);

var twitterKeys = {
  consumer_key: 'L73w7ZBdGn8QyZLAsNCBhKzxY',
  consumer_secret: 'vU0QVQLlYy6TmRZOmRkE0obev9n77U53UTrGhIY35tdH20UL2G',
  access_token_key: '918248754611916803-mifTGpdq6HiCcR47LNuOivSnfrPmiVY',
  access_token_secret: 'QRx9h9OE2U0NvbPRxgdcHSbJRxJo79NYVwmPCReVj3e3C',
}


console.log("-----------I AM LIRI-----------");
console.log("|||   Getting started...    |||");
console.log("|||   Starting boosters...  |||");
console.log("|||   ***** READY *****     |||");
console.log("-------------------------------");


var fs = require("fs");
var Twitter = require("twitter");
var request = require("request");
var prompt = require("prompt");
var Spotify = require('node-spotify-api');

//var tKeys = require('./Keys.js');
//console.log(tKeys);

var client = new Twitter ({
  consumer_key: 'L73w7ZBdGn8QyZLAsNCBhKzxY',
  consumer_secret: 'vU0QVQLlYy6TmRZOmRkE0obev9n77U53UTrGhIY35tdH20UL2G',
  access_token_key: '918248754611916803-mifTGpdq6HiCcR47LNuOivSnfrPmiVY',
  access_token_secret: 'QRx9h9OE2U0NvbPRxgdcHSbJRxJo79NYVwmPCReVj3e3C',
});

var spotifyvar = new Spotify({
  id: '247841dc8deb4be4b442213c66dcfb77',
  secret: '92d1577922c543248b03d2ec6ba6a84b'
});



 prompt.get(['command'], function (err, result) {
    // Log the results. 
    console.log(' --> You commanded me to: ' + result.command);

    if (result.command === "mytweets") {

      console.log("Okay, I will print @alexsaaats latest tweets...")
  		var params = {screen_name: 'alexsaaats'};

  		client.get('statuses/user_timeline', params, function(error, tweets, response) {
  	  		//if(error) throw error;
    			console.log(tweets);  // The favorites. 
    			//console.log(response);  // Raw response object. 
  		});
    }


          else if (result.command === "spotify-this-song") {
            prompt.get(['song'], function (err, result) {

              console.log("Okay, I will get info about " + result.song + " for you...")
                
              spotifyvar.search({ type: 'track', query: result.song }, function(err, data) {
              if (err) {
                return console.log('Error occurred: ' + err);
              }
              var artistname = data.tracks.items[0].album.artists[0].name;
              var songname = data.tracks.items[0].name;
              var previewlink = data.tracks.items[0].preview_url;
              var albumname = data.tracks.items[0].album.name;
              var songcount = data.tracks.total;

              //console.log(data);
              console.log("-------------------------------");
              console.log("-------------------------------");
              console.log("Artist: " + artistname);
              console.log("Song Name: " + songname);
              console.log("Preview Link: " + previewlink);
              console.log("Album Name: " + albumname);
              console.log("-------------------------------");
              console.log("NOTE: This is only the first of many songs you might have been looking for.")
              console.log("NOTE: Total count of songs with " + result.song + " in the name: " + songcount);
              console.log("-------------------------------");
              console.log("-------------------------------");

              });
            });
          }


                else if (result.command === "movie-this") {
                  prompt.get(['movie'], function (err, result) {

                    console.log("Okay, I will get info about " + result.movie + " for you...")
                      
                    spotifyvar.search({ type: 'track', query: result.song }, function(err, data) {
                    if (err) {
                      return console.log('Error occurred: ' + err);
                    }
                    console.log(data); 
                    });
                  });
                }


                    else (console.log("I don't understand what you're asking me to do. You can say mytweets, spotify-this-song, or movie-this. Please start over."));

	  

  });




//Take these commands: 
   //* `my-tweets`
//var mytweets = process.argv[2];
//if (mytweets === "my-tweets") {
	//}

   //* `spotify-this-song`
var spotify = process.argv[2];
if (spotify === "spotify-this-song") {
	console.log("spotty");
}

   //* `movie-this`
var movie = process.argv[2];
if (movie === "movie-this") {
	console.log("dutty movie");
}

   //* `do-what-it-says`
var doit = process.argv[2];
if (doit === "do-what-it-says") {
	console.log("douuuing it");
}


/*
  // If the code experiences any errors it will log the error to the console.
  if (error) {
    return console.log(error);
  }

  // We will then print the contents of data
  console.log(data);

  // Then split it by commas (to make it more readable)
  var dataArr = data.split(",");

  // We will then re-display the content as an array for later use.
  console.log(dataArr);

});

*/