/**
 * Created by gaoletian on 17/10/31.
 */
// const Promise = require('bluebird');
const P = require('./provider');
const R = require('ramda');
const L = require('nirvana-logger')('注册');
L.setFileName('seqmock/demo.js').setMaxLength(100);

L.inOut(function ggg(arg) {
  L(arg)
  return arg
})(1,2,4)
//
// const resolve = (res) => Promise.resolve(res);
//
// const {jiea, nirvana, then200, then801} = P;
//
// const register = (request) => {
//
//   const addUserParam = (result) => {
//     const userDate = {mobile: request.payload.mobile, jieaUserId: result.data.bing};
//     return resolve(userDate);
//   };
//
//   L.setId('kn:123');
//
//   return R.pipeP(
//       L.inOutP(jiea.register),
//       L.inOutP(addUserParam),
//       L.inOutP(nirvana.addUser),
//       L.inOutP(jiea.userTransfer),
//       L,
//   )(request.payload);
// };
//
// const request = {payload: {mobile: '13320649683', smsCode: '1234', channel: 'kaniu', sign: '234234234',},};
//
// register(request).catch(L.error);
