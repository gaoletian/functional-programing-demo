/**
 * Created by gaoletian on 17/10/29.
 */
const R = require('ramda');
const joi = require('joi');
const logger = require('nirvana-logger')('provider');

const L = (description) => (...arg) => {
  logger(description, '==>', ...arg);
  return Promise.resolve(...arg);
};

const result = {
  code   : 400,
  message: '',
  data   : {
    name  : 'gaoletian',
    mobile: '13522287687',
  },
};

const isSuccess = R.propEq('code', 200);
const isNoResult = R.propEq('code', 801);

/**
 * 生成promise
 * @param result
 */
const makePromise = (result) => new Promise(function(resolve) {
  setTimeout(() => resolve(result), 1000);
});

/**
 * 参数较验
 * @param param
 * @param schema
 */
const paramValidate = (param, schema) => {
  const validateResult = joi.validate(param, schema);
  if (validateResult.error) {
    throw validateResult.error;
  }
};

/**
 * 查找用户
 * @param param
 */
const findUser = (param) => {
  const schema = joi.object({
    mobile: joi.string(),
  }).required();
  paramValidate(param, schema);

  // model find
  return makePromise(result);
};

/**
 * 添加用户
 * @param param
 */
const addUser = (param) => {
  const schema = joi.object({
    mobile: joi.string(),
  }).required();
  paramValidate(param, schema);
  // model create
  return makePromise(result);
};

/**
 * 统一处理200
 * @param fn200
 */
const then200 = (fn200 = L('200')) => (result) => {
  if (isSuccess(result))
    return fn200.call(this, result);
  L('错误结果')(result);
  throw result.data;
};
/**
 * 统一处理801
 * @param fn801
 */
const then801 = (fn801 = L('801')) => (result) => {
  if (isNoResult(result))
    return fn801.call(this, result);
  L('错误结果')(result);
  throw result.data;
};

module.exports = {
  makePromise,
  addUser,
  findUser,
  then200,
  then801,
  jiea   : {
    findUserByMobile() {
      return makePromise({code: 200, data: {jieaUserId: 123}});
    },
    register() {
      return makePromise({code: 200, data: {bing: 123}});
    },
    userTransfer() {
      return makePromise({code: 200, data: 'userTransfer'});
    },
  },
  nirvana: {
    addUser(userData) {
      L('addUser入参')(userData);
      const schema = joi.object({
        mobile    : joi.string(),
        jieaUserId: joi.number().integer(),
      }).required();
      paramValidate(userData, schema);

      return makePromise({code: 200, data: 'addUser'});
    },
  },
};