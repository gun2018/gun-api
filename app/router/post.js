'use strict';

module.exports = app => {
  app.post('/addPost', 'post.addPost');
  app.get('/posts', 'post.posts');
  app.get('/post', 'post.post');
};
