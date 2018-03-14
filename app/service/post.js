'use strict';

module.exports = app => {
  return class newsSercive extends app.Service {
    async addPullRequest({ uid, title, description, content, source, type }) {
      const result = await app.mysql.insert('pull_request', {
        uid,
        title, 
        description,
        content,
        source,
        type,
        status: 0,
        created_at: new Date(),
      });
      return result.affectedRows === 1;
    }
    async getPosts() {
      const result = await app.mysql.select('post');
      return result;
    }
    async getPost({ id }) {
      // 待修改！！！！
      const PostTitle = await app.mysql.get('post', { id });
      const PostDetail = await app.mysql.select('post_part', {
        where: {
          post_id: id
        },
        orders: [['order', 'asc']]
      });
      const Post = {
        title: PostTitle,
        detail: PostDetail
      };
      return Post;
    }
  };
};
