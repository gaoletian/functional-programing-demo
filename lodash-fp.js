"use strict";
exports.__esModule = true;
var R = require("ramda");
var selectMember = function (name) { return R.filter(R.propEq('name', name)); };
var exludeCompleted = R.reject(R.propEq('complete', true));
var log = console.log;
var data = {
    tasks: [
        { task: 'lerna js', name: 'gao', complete: true },
        { task: 'teach function', name: 'gao', complete: false },
        { task: 'report', name: 'li', complete: false }
    ]
};
var request = {
    payload: {
        name: 'gaoletian',
        withdrawApplyId: 23,
        amount: 10000,
        period: 12
    },
    yar: {
        _store: {
            jieaUserid: 123,
            userId: 1,
            name: 'gaoletian'
        }
    }
};
function main(request) {
    // 预处理
    var packParam = R.merge(R.pick(['amount', 'period'], request.payload), R.pick(['userId', 'jieaUserid'], request.yar._store));
    // const param1 = R.props(['amount', 'period'], payload(request))
    log(packParam);
}
main(request);
