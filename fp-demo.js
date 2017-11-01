const R = require('ramda');
const log = require('nirvana-logger')('fp:demo');
const P = require('./provider');
const M = require('./message');
const Promise = require('bluebird');

// 涅磐注册
const nirvanaRegister = (req) => P.makePromise({code: 200, data: {id: 1, mobile: '13522287687'}});
// 借啊注册
const jieaRegister = () => P.makePromise({code: 200, data: {jieaUserId: 123}});

const throwError = (...args) => {
  throw new Error(...args);
};

// 登录
const login = async (request) => {
  // 互斥->登陆
  // return 'login';
  log(request);
  return 'abcd';
};

// 注册登录
// const registerAndLogin = async (request) => {
//   await nirvanaRegister(request);
//   await jieaRegister(request);
//   return await login(request);
// };
const warpRequest = (request) => {
  return {request, latest: null, share: null};
};
const registerAndLogin = R.pipeP(
    warpRequest,
    nirvanaRegister,
    jieaRegister,
    login);

const mobileExist = R.pipe(R.prop('payload'), P.findUser);
// 登陆或注册
const loginOrRegister = async (request, reply) => {
  try {
    const isMobileExist = await mobileExist(request);
    const result = M.isSuccess(isMobileExist)
        ? await login(request)
        : await registerAndLogin(request);
    reply(result);
  } catch (err) {
    reply(err);
  }
};

// 执行函数`
loginOrRegister({payload: {mobile: 'request'}}, log);


