const e = require('../../config/error');
const VError = require('verror');

module.exports = {
  // 错误码 自定义模块规则 前两位为模块编号,后两位为具体错误码 如1001
  get ERR_CODE() {
    return e.err_code;
  },

  get ERR_MSG() {
    return e.err_msg;
  },

  /**
   * 返回成功
   * @param {*} argData 返回数据
   * @param {String} msg 信息
   */
  success(argData, msg = null) {
    this.body = this.formatResult(this.ERR_CODE.SUCCESS, msg, argData);
  },
  /**
   * 返回失败
   * @param {*} argCode 错误码
   * @param {*} argMsg 错误信息
   * @param {*} argData 数据
   */
  fail(argCode, argMsg, argData) {
    this.body = this.formatResult(argCode, argMsg, argData);
  },
  /**
   * 构造运行异常对象
   * @param {*} options 错误信息
   */
  error(options = {}) {
    const { code, message } = options;
    throw new VError('fail: "%s"', message || this.ERR_MSG[code] || '');
  },
  formatResult(argCode = this.ERR_CODE.FAIL, argMsg = null, argData = null) {
    let code = argCode;
    let data = argData;
    let msg = '';

    // 判断code类型
    if (typeof argCode !== 'number' || !(argCode in this.ERR_MSG)) {
      code = this.ERR_CODE.FAIL;
    }

    msg = argMsg || this.ERR_MSG[code]; // 手动构造了返回的msg就用该msg，没有构造就返回code对应的msg

    if (
      (code !== this.ERR_CODE.SUCCESS && data === '') ||
      typeof data === 'undefined'
    ) {
      data = null;
    }

    return {
      code,
      msg,
      data,
    };
  },
};
