/**
 * Created by gaoletian on 17/10/31.
 */
// const Promise = require('bluebird');
const P = require('./provider');
const R = require('ramda');
const logger = require('nirvana-logger')('demo');

const L = (description = '', spliter = '==>') => (...arg) => {
  logger(...R.concat([description, spliter], arg));
  return Promise.resolve(...arg);
};
const resolve = (res) => Promise.resolve(res);
const printParam = L('入参');
const print = L();
const printError = L('错误');

const {jiea, nirvana, then200, then801} = P;

const register = (request) => {
  printParam(request.payload);
  return R.pipeP(
      jiea.register,
      then200((result) => {
        const userDate = {mobile: request.payload.mobile, jieaUserId: result.data.bing};
        return resolve(userDate);
      }),
      nirvana.addUser,
      then200(result => printError(result)),
      jiea.userTransfer,
      then200((result) => {
        print(result);
      }),
  )();
};

const request = {payload: {mobile: '13320649683', smsCode: '1234', channel: 'kaniu', sign: '234234234',},};

register(request).catch(printError);
