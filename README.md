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
## Contributing

Bug reports and pull requests are welcome on GitHub at https://github.com/botmetrics/botmetrics.js. This project is intended to be a safe, welcoming space for collaboration, and contributors are expected to adhere to the [Contributor Covenant](http://contributor-covenant.org) code of conduct.

## License

The gem is available as open source under the terms of the [MIT License](http://opensource.org/licenses/MIT).

