//Start LIRI
console.log("-----------I AM LIRI-----------");
console.log("|||   Getting started...    |||");
console.log("|||   Starting boosters...  |||");
console.log("|||   ***** READY *****     |||");
console.log("-------------------------------");

//Set packages
var fs = require("fs");
var Twitter = require("twitter");
var request = require("request");
var prompt = require("prompt");
var Spotify = require('node-spotify-api');


//var tKeys = require('./Keys.js');
//console.log(tKeys);


//KEYS FILE NOT WORKING FOR ME - used this work around
var client = new Twitter ({
  consumer_key: 'L73w7ZBdGn8QyZLAsNCBhKzxY',
  consumer_secret: 'vU0QVQLlYy6TmRZOmRkE0obev9n77U53UTrGhIY35tdH20UL2G',
  access_token_key: '918248754611916803-mifTGpdq6HiCcR47LNuOivSnfrPmiVY',
  access_token_secret: 'QRx9h9OE2U0NvbPRxgdcHSbJRxJo79NYVwmPCReVj3e3C',
});

//Spotify API ID and Secret
var spotifyvar = new Spotify({
  id: '247841dc8deb4be4b442213c66dcfb77',
  secret: '92d1577922c543248b03d2ec6ba6a84b'
});

//OMDB API Key
var omdbkey = '40e9cece';


//Start with the first prompt that asks the user which command to run
 prompt.get(['command'], function (err, result) {
    // Log the results. 
    console.log(' --> You commanded me to: ' + result.command);

    if (result.command === "my-tweets") {

      console.log("Okay, I will print @alexsaaats latest tweets...")
  		var params = {screen_name: 'alexsaaats'};

  		client.get('statuses/user_timeline', params, function(error, tweets, response) {
  	  		//if(error) throw error;
    			console.log(tweets);  
    			//console.log(response);  // Raw response object. 
  		});
    }

          //If they didn't ask for MyTweets, see if they asked for Spotify
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

                //If they didn't ask for either of the first two, see if they asked for movie"
                else if (result.command === "movie-this") {
                  prompt.get(['movie'], function (err, result) {
                    console.log("Okay, I will get info about " + result.movie + " for you...")
                    if (err) {
                      return console.log('Error occurred: ' + err);
                    }

                    request("http://www.omdbapi.com/?apikey=" + omdbkey + "&t=" + result.movie, function(error, response, data) {
                    // If the request was successful...
                      if (!error && response.statusCode === 200) {
                      var moviedata = JSON.parse(data);
                      
                      //console.log(data);
                      //console.log(moviedata);

                      console.log("-------------------------------");
                      console.log("-------------------------------");
                      console.log("Title: " + moviedata.Title);
                      console.log("Year: " + moviedata.Year);
                      console.log("IMDB Rating: " + moviedata.Ratings[0].Value);
                      console.log("Rotten Tomatoes Rating: " + moviedata.Ratings[1].Value);
                      console.log("Country: " + moviedata.Country);
                      console.log("Language: " + moviedata.Language);
                      console.log("Plot: " + moviedata.Plot);
                      console.log("Actors: " + moviedata.Actors);
                      console.log("-------------------------------");
                      console.log("-------------------------------");
                      }
                    });
                  });
                }

                      //If they didn't ask for the movie, see if they asked for do what it says
                      else if (result.command === "do-what-it-says") {
                        console.log("This should use FS package to get values from random.txt and use it to call a LIRI function");
                      }

                          //If they didn't ask for any known function, tell them you're confused and provide directions.
                          else (console.log("I don't understand what you're asking me to do. You can say mytweets, spotify-this-song, movie-this, or do-what-it-says. Please start over."));

	  
//Close the first 'command' prompt
  });


