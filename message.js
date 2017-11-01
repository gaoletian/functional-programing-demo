/**
 * Created by gaoletian on 17/10/29.
 */
const R = require('ramda')

const isSuccess = R.compose(R.equals(200), R.prop('code'))
const isParamError = R.compose(R.equals(400), R.prop('code'))
const isNoResult = R.compose(R.equals(801), R.prop('code'))
const isSystemError = R.compose(R.equals(501), R.prop('code'))

module.exports = {
  isSuccess,
  isParamError,
  isNoResult,
  isSystemError,
}