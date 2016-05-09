var HttpClient = require('scoped-http-client');

var Botmetrics = {};

Botmetrics.registerBot = function(token, opts, callback) {
  if(typeof opts == 'function') {
     callback = opts;
  }

  var botId = (opts && opts['botId']) ? opts['botId'] : process.env.BOTMETRICS_BOT_ID;
  var apiKey = (opts && opts['apiKey']) ? opts['apiKey'] : process.env.BOTMETRICS_API_KEY;

  if(!botId || botId == "") {
    callback(new Error("You have to either set the env variable BOTMETRICS_BOT_ID or pass in an as argument botId"));
  }
  if(!apiKey || apiKey == "") {
    callback(new Error("You have to either set the env variable BOTMETRICS_API_KEY or pass in an as argument apiKey"));
  }

  var createdAt = (opts && opts['createdAt']) ? opts['createdAt'] : null;
  var host = process.env.BOTMETRICS_API_HOST || 'https://www.getbotmetrics.com';
  var url = host + "/bots/" + botId + "/instances";

  var params =  {
    instance: {
      token: token
    }
  };
  if(createdAt) {
    params['instance']['created_at'] = createdAt;
  }
  var http = HttpClient.create(url);
  http.header('Authorization', apiKey).
       header('Content-Type', 'application/json').
       post(JSON.stringify(params))(function(err, resp, body) {
    if(err) {
      callback(err, false);
    } else if (resp.statusCode != 201) {
      callback(new Error("Unexpected Status Code from Botmetrics API"), false);
    } else {
      callback(null, true);
    }
  });
};

module.exports = Botmetrics;
