# gun-admin


## 快速入门

<!-- 在此次添加使用文档 -->
node 兼容至8.0.0，推荐使用最新的LTS版本（>=8.9.0）；
redis-server配置 requirepass 为 gun2017
mysql配置用户 local_gun 密码 gun2017
本地自行新建mysql库gun
建表user(id, account, password); 插入测试数据（之后再弄成线上的测试库）

###本地host配置
```
127.0.0.1 api.gun.com
```

###nginx配置
```
server {
  listen 80;
    server_name api.gun.com;
    underscores_in_headers on;

    location / {
           proxy_pass http://127.0.0.1:7001;
    }

   }
```

### 本地开发

```bash
$ npm i
$ npm run dev
$ open http://api.gun.com/
```

### 部署

```bash
$ npm start
$ npm stop
```

### 单元测试

- [egg-bin] 内置了 [mocha], [thunk-mocha], [power-assert], [istanbul] 等框架，让你可以专注于写单元测试，无需理会配套工具。
- 断言库非常推荐使用 [power-assert]。
- 具体参见 [egg 文档 - 单元测试](https://eggjs.org/zh-cn/core/unittest)。

### 内置指令

- 使用 `npm run lint` 来做代码风格检查。
- 使用 `npm test` 来执行单元测试。
- 使用 `npm run autod` 来自动检测依赖更新，详细参见 [autod](https://www.npmjs.com/package/autod) 。


[egg]: https://eggjs.org
