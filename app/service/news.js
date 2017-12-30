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
  };
};
