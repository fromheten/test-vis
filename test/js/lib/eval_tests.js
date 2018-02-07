// @flow
const e = require('../../../lib/eval.js')
const test = require('tape')

test('tail recursion', t => {
  const javascriptCallStackDepth = (function() {
    let depth = 0
    try {
      const recur = function(n) {
        depth = n
        recur(n + 1)
      }
      // Will throw an error when it exceeds call stack
      recur(depth)
      return depth
    } catch (e) {
      // When call stack is exceeded
      return depth
    }
  })()
  const platoCallStackDepthIsOver = (function() {
    let expression = ['quote', []]
    for (let i = 0; i <= javascriptCallStackDepth * 1001; i++) {
      expression[1].push('1')
    }
    return e(expression, {}).length
  })()
  t.assert(
    platoCallStackDepthIsOver > javascriptCallStackDepth * 1000,
    "Steele & Sussman - it wouldn't be possible without your contribution! If you read this, thank you!"
  )
  t.end()
})
