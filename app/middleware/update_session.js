'use strict';

module.exports = () => {
  return function* (next) {
    yield next;
    if (!this.session.visited) return;
    // update session's expiration
    this.session.save();
  };
};
