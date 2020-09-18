const Twit = require('twit');
var port = process.env.PORT || 3002;
const T = new Twit({
  consumer_key: 's3UAKG4oa5A7kmx9CumKuBr28',
  consumer_secret: 'TSkO7hIjBRzuxEaLxhqETj74mPUWYylubuhTNceBF7CNDHhXtz',
  access_token: '218529256-RhXX8NZlWa7MQZCEjJx58eSUBL4XUuIjr90Mk4jO',
  access_token_secret: '5xxaZonH3OxuA1H6QTAaqrleX9LqKX2UAsVg4RJSash0D'
});

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