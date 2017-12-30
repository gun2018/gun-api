'use strict';
const bcrypt = require('bcrypt');

module.exports = app => {
  return class UserService extends app.Service {
    async isExisted({ nickname, email }) {
      //test nickname or email
      return await app.mysql.get('users', 
        {
          [nickname ? 'nickname' : 'email']: nickname || email,
        }, 
        {
          columns: ['id'],
        });
    }
    async find({ nickname, email, password }) {
      const user = await app.mysql.get('users', {
        [nickname ? 'nickname' : 'email']: nickname || email,
      });
      if (!password || this.compare(password, user.password)) return user;
    }
    async save({ nickname, email, password }) {
      const salt = await bcrypt.genSalt();
      const hashPassword = await bcrypt.hash(password, salt);

      const result = await app.mysql.insert('users', {
        nickname, 
        email,
        password: hashPassword,
        created_at: new Date(),
      });
      return result.affectedRows === 1;
    }
    async compare(data, hash) {
      return await bcrypt.compare(data, hash);
    }
    
  };
};
