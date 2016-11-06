import chai, {expect} from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

chai.use(sinonChai);

import GoodWinstonObject from '../lib';

describe('good-winston-object', function () {
  let goodWinstonObject;
  let winston;

  beforeEach(function () {
    winston = {
      levels: {
        error: 0,
        warn: 1,
        info: 2,
        verbose: 3,
        debug: 4,
        silly: 5
      },
      log: sinon.spy()
    };
    goodWinstonObject = new GoodWinstonObject(winston);
  });

  it('should be an object', function () {
    expect(goodWinstonObject).to.be.an('object');
  });

  describe('_getLoggingLevel', function () {
    it('should be a function', function () {
      expect(goodWinstonObject._getLoggingLevel).to.be.a('function');
    });

    it('should return the default log level', function () {
      const tags = ['fake'];
      const level = goodWinstonObject._getLoggingLevel(tags);

      expect(level).to.equal('info');
    });

    it('should return the valid log level provided', function () {
      const tags = ['error', 'fake'];
      const level = goodWinstonObject._getLoggingLevel(tags);

      expect(level).to.equal('error');
    });
  });

  describe('_getTags', function () {
    it('should be a function', function () {
      expect(goodWinstonObject._getTags).to.be.a('function');
    });

    it('should return the right tags', function () {
      const data = {
        event: 'request',
        tags: ['info']
      };
      const tags = goodWinstonObject._getTags(data);

      expect(tags).to.eql(['info', 'request']);
    });

    it('should return the right tags, without duplicates', function () {
      const data = {
        event: 'request',
        tags: ['info', 'request']
      };
      const tags = goodWinstonObject._getTags(data);

      expect(tags).to.eql(['info', 'request']);
    });
  });

  describe('_write', function () {
    it('should log the entire data object', function () {
      const data = {
        event: 'request',
        tags: ['info']
      };

      const callback = sinon.spy();

      goodWinstonObject._write(data, 'utf8', callback);

      expect(winston.log).to.have.been.calledWith('info', data);
    });
  });
});
