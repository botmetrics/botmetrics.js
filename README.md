## Botmetrics

[Botmetrics](https://www.getbotmetrics.com) is a service that lets you
collect & analyze metrics from your bots (Slack, Facebook, Kik, Telegram
and more).

This Node.JS client lets you register your bot with Botmetrics and
starts metrics collection.

### Installation

To install this as part of your Node.JS project, add this to your
`dependencies` in your application's package.json:

`botmetrics`

or run

`$ npm install --save botmetrics`

### Usage

Log in to your [BotMetrics](https://getbotmetrics.com) account, navigate
to "Bot Settings" and find out your Bot ID and API Key.

Set the following environment variables with the Bot ID and API
Key respectively.

```
BOTMETRICS_BOT_ID=your-bot-id
BOTMETRICS_API_KEY=your-api-key
```

Once you have that set up, every time you create a new Slack Bot (in the
OAuth2 callback), and assuming the bot token you received as part of the
OAuth2 callback is `bot-token`, make the following call:

```javascript
BotMetrics.registerBot('bot-token', function(err, status) {

});
```

### Retroactive Registration

If you created your bot in the past, you can pass in `createdAt` with
the UNIX timestamp of when your bot was created, like so:

```javascript
BotMetrics.registerBot('bot-token', {createdAt: 1462318092}, function(err, status) {

});
```

### Messaging a user or channel

You can use Botmetrics to message a user (via DM) or a channel for a
given team. You can do this like this:

```javascript
BotMetrics.message('slack-team-id', {user: 'USLACKBOT', text: 'hello there'}, function(err, status) {

});
```

For a channel, pass the Slack Channel ID as a parameter:

```javascript
BotMetrics.message('slack-team-id', {channel: 'CCAFEDEAD1', text: 'hello there'}, function(err, status) {

});
```

To send attachments, you can send an attachments array:

```javascript
Botmetrics.message('slack-team-id', {channel: 'CCAFEDEAD', attachments: [{"fallback": "hello", "text": "hello"}] }, function(err, status) {
  expect(status).to.be.true;
  expect(scope.isDone()).to.be.true;
  done();
});
```

To read more about Slack attachments, you can check it out at this [Slack
API Docs page](https://api.slack.com/docs/attachments).

BotMetrics will queue your message for sending. If your message is
correctly formatted, you will receive `status=true` in the callback.

## Contributing

Bug reports and pull requests are welcome on GitHub at https://github.com/botmetrics/botmetrics.js. This project is intended to be a safe, welcoming space for collaboration, and contributors are expected to adhere to the [Contributor Covenant](http://contributor-covenant.org) code of conduct.

## License

The gem is available as open source under the terms of the [MIT License](http://opensource.org/licenses/MIT).

