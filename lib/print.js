const R = require('ramda');
//
// const printIn = L('[入参]', '');
// const printOut = L('[出参]', '');
// const printErr = L('[异常]', '');
//

const L = (description = '', spliter = '==>') => (...arg) => {
  console.log(...R.concat([description, spliter], arg));
  return Promise.resolve(...arg);
};

/**
 * 打印函数的入参出参
 * @param fn
 * @param fnInfo
 * @example
 *
 * printInOut(hello)('abc')
 *
 * printInOut(hello, 'helloFn')('abc')
 */
const printInOut = (fn, fnInfo = null) => R.pipe(
    L(`[${fnInfo || fn.name || 'Anonymous fn'}]`, '[入参]'),
    fn,
    L(`[${fnInfo || fn.name || 'Anonymous fn'}]`, '[出参]'),
);
//
// const printInOutP = (fn, fnInfo = null) => R.pipeP(
//     L(`[${fnInfo || fn.name}]`, '[入参]'), fn, L(`[${fnInfo || fn.name}]`, '[出参]'),
// );
//
// module.exports = module.exports.default = {
//   printIn,
//   printOut,
//   printError,
//   printInOut,
//   printInP,
//   printOutP,
//   printErrP,
//   printInOutP,
// };

function hello() {

}

printInOut(val => val)('abc');
printInOut(function abc(val) {
  return val
})('abc');