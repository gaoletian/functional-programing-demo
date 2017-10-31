/**
 * Created by gaoletian on 17/10/31.
 */
// const Promise = require('bluebird');
const P = require('./provider');
const R = require('ramda');
const logger = require('nirvana-logger')('demo');

const L = (description) => (...arg) => {
  logger(description, '==>', ...arg);
  return Promise.resolve(...arg);
};

const {jiea, nirvana, then200, then801} = P;

const register = (request) => {
  L('入参')(request.payload);
  return R.pipeP(
      jiea.register,
      then200((result) => {
        const userDate = {mobile: request.payload.mobile, jieaUserId: result.data.bing};
        return Promise.resolve(userDate);
      }),
      nirvana.addUser,
      then200((result) => {
        L('nirvana.addUser')(result);
      }),
      jiea.userTransfer,
      then200((result) => {
        L('jiea.userTransfer')(result);
      }),
  )();
};

register({
  payload: {
    mobile : '13320649683',
    smsCode: '1234',
    channel: 'kaniu',
    sign   : '234234234',
  },
}, L('reply')).catch(L('系统异常'));
