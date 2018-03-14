'use strict';

module.exports = app => {
  return class NewsController extends app.Controller {
    async posts() {
      // console.log('this', this.);
      const { ctx, service: { post: PostService } } = this;
      // const { limit, page } = ctx.request.query;
      console.log('post', PostService);
      const data = await PostService.getPosts();
      ctx.body = {
        code: 0,
        data
      };
    }
    async post() {
      const { ctx, service: { post: PostService } } = this;
      console.log('request', ctx.query);
      const data = await PostService.getPost({
        id: ctx.query.id
      });
      ctx.body = {
        code: 0,
        data
      };
    }
    async addPost() {
      const { ctx, service: { post: PostService } } = this;
      const { uid, title, description, content, source } = ctx.request.body;
      const isSuccess = await PostService.addPullRequest({ 
        uid,
        title,
        description, 
        content,
        source,
        type: 'news',
      });
      if (!isSuccess) return ctx.throw(500);
      ctx.body = { success: true };
    }
  };
};
