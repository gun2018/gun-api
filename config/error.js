exports.err_code = {
  SUCCESS: 0,
  FAIL: -1,
  EMPTY: -2,
  PARAM_ERR: -3,
  FAIL_AUTH: -4,
  // 尝试次数过多
  OVER_LIMIT: -5,

  AUTH: {
    PHONE_FORMAT_ERR: 1001, // 手机号格式错误
    ALREADY_REGISTER: 1002, // 已经注册
    SMS_FAIL: 1003, // 短信发送失败
    REGISTER_BLACK_LIST: 1004,
    LOGIN_BLACK_LIST: 1005,
    NAME_WRONG: 1006,
    PASSWORD_WRONG: 1007,
    NO_VERIFY_CODE: 1008,
    VERIFY_CODE_WRONG: 1009,
    VERIFY_CODE_OUTDATED: 1010,
    NOT_REGISTERED: 1011,
    PHONE_OR_PASSWORD_WRONG: 1012,
  },
};

exports.err_msg = {
  '0': '成功',
  '-1': '失败',
  '-2': '数据为空',
  '-3': '参数错误',
  '-4': '请登录',
  '-5': '尝试过多',
  '1001': '手机号格式错误',
  '1002': '该手机号已注册此角色账号',
  '1003': '短信发送失败,请稍后重试',
  '1004': '抱歉,无法注册',
  '1005': '抱歉,无法登录',
  '1006': '姓名格式错误',
  '1007': '密码不能少于6位',
  '1008': '请获取验证码',
  '1009': '验证码错误',
  '1010': '验证码过期,请重新获取',
  '1011': '该手机号未注册此角色账号',
  '1012': '手机号或密码错误',
};
