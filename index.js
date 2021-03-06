var config = require('./config/config')//imports keys 
const Twit = require('twit');

const T = new Twit(config);

// start stream and track tweets
const stream = T.stream('statuses/filter', {track: '#AlanPartridge'});
// use this to log errors from requests
function responseCallback (err, data, response) {
 console.log(err);
}
// event handler
stream.on('tweet', tweet => {
    console.log(tweet.text);
   // retweet
  T.post('statuses/retweet/:id', {id: tweet.id_str}, responseCallback);
  // like
  T.post('favorites/create', {id: tweet.id_str}, responseCallback);
});