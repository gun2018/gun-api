'use strict';

module.exports = app => {
  app.post('/addPost', 'post.addPost');
};
