// @flow

const e = require('../lib/eval.js')
const first = require('../lib/first.js')
const rest = require('../lib/rest.js')
const { merge, reduce, assoc } = require('ramda')

const sourceIdMapping = expression =>
  assoc(e(['id', expression], {}), JSON.stringify(first(rest(expression))), {})

function main() {
  console.log(
    reduce(merge, {}, [
      sourceIdMapping(['id', ['lambda', ['x'], ['cons', 'x', 'x']]]),
      sourceIdMapping(['id', ['cons', 'Computing', 'rocks!']]),
      sourceIdMapping([
        'id',
        ['quote', 'A point of view is worth 80 IQ points']
      ])
    ])
  )
}

main()
