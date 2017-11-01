import * as R from 'ramda'

const selectMember = (name: string) => R.filter(R.propEq('name', name))
const exludeCompleted = R.reject(R.propEq('complete', true))
const log = console.log


const data = {
    tasks: [
        {task: 'lerna js', name: 'gao', complete: true},
        {task: 'teach function', name: 'gao', complete: false},
        {task: 'report', name: 'li', complete: false}
    ]
}

const request = {
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
}

function main(request) {

    // 预处理
    const packParam = R.merge(
        R.pick(['amount', 'period'], request.payload),
        R.pick(['userId', 'jieaUserid'], request.yar._store)
    )

    // const param1 = R.props(['amount', 'period'], payload(request))

    log(packParam)

}

main(request)
