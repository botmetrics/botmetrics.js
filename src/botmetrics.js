var HttpClient = require('scoped-http-client');
var _ = require('lodash');

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

Botmetrics.message = function(teamId, opts, callback) {
  var messageOpts = {};

  if(typeof opts == 'function') {
    callback = opts;
  } else {
    messageOpts = opts;
  }

  var botId = (messageOpts && messageOpts['botId']) ? messageOpts['botId'] : process.env.BOTMETRICS_BOT_ID;
  var apiKey = (messageOpts && messageOpts['apiKey']) ? messageOpts['apiKey'] : process.env.BOTMETRICS_API_KEY;

  if(!botId || botId == "") {
    callback(new Error("You have to either set the env variable BOTMETRICS_BOT_ID or pass in an as argument botId"));
  }
  if(!apiKey || apiKey == "") {
    callback(new Error("You have to either set the env variable BOTMETRICS_API_KEY or pass in an as argument apiKey"));
  }

  var host = process.env.BOTMETRICS_API_HOST || 'https://www.getbotmetrics.com';
  var url = host + "/bots/" + botId + "/messages";

  var params =  {
    message: {
      team_id: teamId,
    }
  };

  if (messageOpts['user'] && messageOpts['user'].length > 0) {
    params['message']['user'] = messageOpts['user'].trim();
  }

  if (messageOpts['channel'] && messageOpts['channel'].length > 0) {
    params['message']['channel'] = messageOpts['channel'].trim();
  }

  if (messageOpts['text'] && messageOpts['text'].length > 0) {
    params['message']['text'] = messageOpts['text'].trim();
  }

  if (attachments = messageOpts['attachments']) {
    if (!_.isString(attachments)) {
      attachments = JSON.stringify(attachments);
    }

    params['message']['attachments'] = attachments;
  }

  if (!((params['message']['user'] && params['message']['user'].length > 0) ||
       (params['message']['channel'] && params['message']['channel'].length > 0))) {
    callback(new Error("You must specify either a 'user' or 'channel' to send the message to"), false);
    return;
  }

  var http = HttpClient.create(url);
  http.header('Authorization', apiKey).
       header('Content-Type', 'application/json').
       post(JSON.stringify(params))(function(err, resp, body) {
    if(err) {
      callback(err, false);
    } else if (resp.statusCode != 202) {
      callback(new Error("Unexpected Status Code from Botmetrics API"), false);
    } else {
      callback(null, true);
    }
  });
};

Botmetrics.track = function(event, opts, callback) {
  var messageOpts = {};

  if(typeof opts == 'function') {
    callback = opts;
  } else {
    messageOpts = opts;
  }

  var botId = (messageOpts && messageOpts['botId']) ? messageOpts['botId'] : process.env.BOTMETRICS_BOT_ID;
  var apiKey = (messageOpts && messageOpts['apiKey']) ? messageOpts['apiKey'] : process.env.BOTMETRICS_API_KEY;

  if(!botId || botId == "") {
    callback(new Error("You have to either set the env variable BOTMETRICS_BOT_ID or pass in an as argument botId"));
  }
  if(!apiKey || apiKey == "") {
    callback(new Error("You have to either set the env variable BOTMETRICS_API_KEY or pass in an as argument apiKey"));
  }

  var host = process.env.BOTMETRICS_API_HOST || 'https://www.getbotmetrics.com';
  var url = host + "/bots/" + botId + "/events";

  var http = HttpClient.create(url);
  http.header('Authorization', apiKey).
       header('Content-Type', 'application/json').
       post(JSON.stringify({event: JSON.stringify(event)}))(function(err, resp, body) {
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
