'use strict';

module.exports = app => {
  app.post('/addNews', 'news.addNews');
};
