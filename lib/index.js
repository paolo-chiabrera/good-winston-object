import _ from 'lodash';
import stream from 'stream';
import Hoek from 'hoek';

export default class GoodWinstonObject extends stream.Writable {

  constructor(winston) {
    super({objectMode: true});

    Hoek.assert(this.constructor === GoodWinstonObject, 'GoodWinstonObject must be created with new');
    Hoek.assert(winston, 'winston logger must not be null');

    this.winston = winston;
    this.levels = _.keys(winston.levels);
    this.defaultLevel = 'info';
  }

  _getLoggingLevel(tags = []) {
    const levels = _.intersection(tags, this.levels);

    if (!_.isArray(levels) || _.isEmpty(levels)) {
      return this.defaultLevel;
    }

    return levels[0];
  }

  _getTags(data) {
    const tags = data.tags || [];

    if (tags.indexOf(data.event) === -1) {
      tags.push(data.event);
    }

    return tags;
  }

  _write(data, encoding, callback) {
    const _data = _.clone(data);

    _data.tags = this._getTags(data);

    const level = this._getLoggingLevel(_data.tags);

    this.winston.log(level, data);

    setImmediate(callback);
  }
}
