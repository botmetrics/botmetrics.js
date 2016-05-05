var chai = require('chai');
var sinon = require('sinon');
var nock = require('nock');
var Botmetrics = require('../src/botmetrics');

chai.use(require('sinon-chai'));
expect = chai.expect;

describe('Botmetrics', function() {
  describe('registerBot', function() {
    context('with environment variables set', function() {
      var params;
      var scope;
      var statusCode;

      beforeEach(function() {
        process.env.BOTMETRICS_TEAM_ID = 'botmetrics-team-id';
        process.env.BOTMETRICS_BOT_ID = 'botmetrics-bot-id';
        process.env.BOTMETRICS_API_KEY = 'botmetrics-api-key';

        scope = nock('https://www.getbotmetrics.com', {
            reqheaders: {
                'Authorization': 'botmetrics-api-key',
                'Content-Type': 'application/json'
              }
            })
            .post('/teams/botmetrics-team-id/bots/botmetrics-bot-id/instances', params)
            .reply(statusCode);
      });

      afterEach(function() {
        process.env.BOTMETRICS_TEAM_ID = null;
        process.env.BOTMETRICS_BOT_ID = null;
        process.env.BOTMETRICS_API_KEY = null;
      });

      context('API returns the correct status code', function() {
        before(function() {
          statusCode = 201;
          params = {
            instance: {
              token: 'bot-token',
            }
          };
        });

        it('should make a call to the Botmetrics API registering the bot', function(done) {
          Botmetrics.registerBot('bot-token', function(err, status) {
            expect(status).to.be.true;
            expect(scope.isDone()).to.be.true;
            done();
          });
        });
      });

      context('when createdAt is passed as a param', function() {
        before(function() {
          statusCode = 201;
          params = {
            instance: {
              token: 'bot-token',
              created_at: 1462487864
            }
          };
        });

        it('should make a call to the Botmetrics API registering the bot', function(done) {
          Botmetrics.registerBot('bot-token', {createdAt: 1462487864}, function(err, status) {
            expect(status).to.be.true;
            expect(scope.isDone()).to.be.true;
            done();
          });
        });
      });

      context('API returns an unexpected status code', function() {
        before(function() {
          statusCode = 202;
          params = {
            instance: {
              token: 'bot-token',
            }
          };
        });

        it('should make a call to the Botmetrics API registering the bot', function(done) {
          Botmetrics.registerBot('bot-token', function(err, status) {
            expect(err).to.not.be.null;
            expect(err.message).to.eql('Unexpected Status Code from Botmetrics API');
            expect(status).to.be.false;
            expect(scope.isDone()).to.be.true;
            done();
          });
        });
      });
    });

    context('without environment variables set, but passed in correctly as params', function() {
      var params;
      var scope;
      var statusCode;

      beforeEach(function() {
        params = {
          instance: {
            token: 'bot-token',
          }
        };

        scope = nock('https://www.getbotmetrics.com', {
            reqheaders: {
                'Authorization': 'botmetrics-api-key',
                'Content-Type': 'application/json'
              }
            })
            .post('/teams/botmetrics-team-id/bots/botmetrics-bot-id/instances', params)
            .reply(statusCode);
      });

      context('API returns the correct status code', function() {
        before(function() {
          statusCode = 201;
        });

        it('should make a call to the Botmetrics API registering the bot', function(done) {
          Botmetrics.registerBot('bot-token', {teamId: 'botmetrics-team-id', apiKey: 'botmetrics-api-key', botId: 'botmetrics-bot-id'}, function(err, status) {
            expect(status).to.be.true;
            expect(scope.isDone()).to.be.true;
            done();
          });
        });
      });

      context('API returns an unexpected status code', function() {
        before(function() {
          statusCode = 202;
        });

        it('should make a call to the Botmetrics API registering the bot', function(done) {
          Botmetrics.registerBot('bot-token', {teamId: 'botmetrics-team-id', apiKey: 'botmetrics-api-key', botId: 'botmetrics-bot-id'}, function(err, status) {
            expect(err).to.not.be.null;
            expect(err.message).to.eql('Unexpected Status Code from Botmetrics API');
            expect(status).to.be.false;
            expect(scope.isDone()).to.be.true;
            done();
          });
        });
      });
    });
  });

  context('with teamId not set', function() {
    it('should return an error', function() {
      Botmetrics.registerBot('bot-token', function(err, status) {
        expect(err).to.not.be.null;
        expect(err.message).to.eql('You have to either set the env variable BOTMETRICS_TEAM_ID or pass in an as argument teamId');
        expect(status).to.be.false;
      });
    });
  });

  context('with botId not set', function() {
    beforeEach(function() {
      process.env.BOTMETRICS_TEAM_ID = 'botmetrics-team-id';
    });

    afterEach(function() {
      process.env.BOTMETRICS_TEAM_ID = null;
    });

    it('should return an error', function() {
      Botmetrics.registerBot('bot-token', function(err, status) {
        expect(err).to.not.be.null;
        expect(err.message).to.eql('You have to either set the env variable BOTMETRICS_BOT_ID or pass in an as argument botId');
        expect(status).to.be.false;
      });
    });
  });

  context('with apiKey not set', function() {
    beforeEach(function() {
      process.env.BOTMETRICS_TEAM_ID = 'botmetrics-team-id';
      process.env.BOTMETRICS_BOT_ID = 'botmetrics-bot-id';
    });

    afterEach(function() {
      process.env.BOTMETRICS_TEAM_ID = null;
      process.env.BOTMETRICS_BOT_ID = null;
    });

    it('should return an error', function() {
      Botmetrics.registerBot('bot-token', function(err, status) {
        expect(err).to.not.be.null;
        expect(err.message).to.eql('You have to either set the env variable BOTMETRICS_API_KEY or pass in an as argument apiKey');
        expect(status).to.be.false;
      });
    });
  });
});
