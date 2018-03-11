'use strict';

module.exports = app => {
  return class NewsController extends app.Controller {
    // async posts() {
    //   const { ctx, servive: { news: NewsService } } = this;
    //   const { limit, page } = ctx.request.query;
      
    // }
    async addNews() {
      const { ctx, service: { news: NewsService } } = this;
      const { uid, title, description, content, source } = ctx.request.body;
      const isSuccess = await NewsService.addPullRequest({ 
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
