// @flow
const test = require('tape')
const { equals, not, is, identity } = require('ramda')
const { expand, paths, isPlato, platoPaths } = require('../../../lib/expand')

test('path gen', t => {
  // Thanks Matt!
  t.deepLooseEqual(paths([['x', 'y'], [['z']], 'nfa']), [
    [0],
    [0, 0],
    [0, 1],
    [1],
    [1, 0],
    [1, 0, 0],
    [2]
  ])
  t.end()
})

test('finding a plato expression', t => {
  t.assert(
    isPlato(['plato', 'plato:0:K15fdTwF0lDGzG5rM4lx3lLKCzy1+QTtyeOwTUd+3vY='])
  )
  t.assert(
    not(
      isPlato([
        'not plato',
        'plato:0:K15fdTwF0lDGzG5rM4lx3lLKCzy1+QTtyeOwTUd+3vY='
      ])
    )
  )
  t.end()
})

test('finding plato expressions in a tree', t => {
  t.deepLooseEqual(
    platoPaths([
      'plato',
      'plato:0:K15fdTwF0lDGzG5rM4lx3lLKCzy1+QTtyeOwTUd+3vY='
    ]),
    [[]],
    'An empty array means the whole thing is a plato expression'
  )
  t.deepLooseEqual(
    platoPaths([
      ['plato', 'plato:0:K15fdTwF0lDGzG5rM4lx3lLKCzy1+QTtyeOwTUd+3vY='],
      'hallå'
    ]),
    [[0]]
  )
  t.deepLooseEqual(
    platoPaths([
      [[['plato', 'plato:0:K15fdTwF0lDGzG5rM4lx3lLKCzy1+QTtyeOwTUd+3vY=']]],
      ['whatever', 'something']
    ]),
    [[0, 0, 0]]
  )
  t.deepLooseEqual(platoPaths([['nix!', 'no expansion here'], 'hallå']), [])
  t.end()
})

const testLookerUpper = function(platoId: string) {
  console.assert(is(String)(platoId), 'platoId must be a string')
  const testMemory = {
    'plato:0:9uWrYPLrMNyx2i4BBPKXz79RnKqruqzSapwE5IE+apc=':
      '["lambda",["x"],["cons","x","x"]]',
    'plato:0:Z0Yqlgtpmiw9ABAGUYmmbeFzrwx+snEN8QYKwY0NMcE=':
      '["cons","Computing","rocks!"]',
    'plato:0:ZZvkezRIoAMIXSBCkqa8P0QsAjSjk0ma1L3aI8+/YwM=':
      '["quote","A point of view is worth 80 IQ points"]'
  }
  return new Promise(
    (resolve, reject) =>
      testMemory[platoId]
        ? resolve(testMemory[platoId])
        : reject('Could not find source for ID ' + platoId)
  )
}

test('expanding an expression with no plato calls returns like identity', t => {
  const testExpression = ['cons', ['quote', 'a'], ['quote', 'b']]
  expand(testExpression, testLookerUpper)
    .then(expression => t.deepLooseEqual(testExpression, expression))
    .catch(x => t.fail('fail:', x))
  t.end()
})

test('Expanding a single ID', t => {
  expand(
    ['plato', 'plato:0:Z0Yqlgtpmiw9ABAGUYmmbeFzrwx+snEN8QYKwY0NMcE='],
    testLookerUpper
  )
    .then(expression => {
      t.deepLooseEqual(expression, ['cons', 'Computing', 'rocks!'])
      t.end()
    })
    .catch(err => {
      t.fail(err)
      t.end()
    })
})

test('Expanding a plato expression in a tree', t => {
  expand(
    [
      'cons',
      'Alan Kay said: ',
      ['plato', 'plato:0:ZZvkezRIoAMIXSBCkqa8P0QsAjSjk0ma1L3aI8+/YwM=']
    ],
    testLookerUpper
  )
    .then(expression => {
      t.deepLooseEqual(expression, [
        'cons',
        'Alan Kay said: ',
        ['quote', 'A point of view is worth 80 IQ points']
      ])
      t.end()
    })
    .catch(error => {
      t.fail(error)
      t.end()
    })
})

test('expanding multiple plato expressions in a tree', t => {
  expand(
    [
      'cons',
      [
        'quote',
        ['plato', 'plato:0:ZZvkezRIoAMIXSBCkqa8P0QsAjSjk0ma1L3aI8+/YwM=']
      ],
      ['plato', 'plato:0:ZZvkezRIoAMIXSBCkqa8P0QsAjSjk0ma1L3aI8+/YwM=']
    ],
    testLookerUpper
  )
    .then(expression => {
      t.deepLooseEqual(expression, [
        'cons',
        ['quote', ['quote', 'A point of view is worth 80 IQ points']],
        ['quote', 'A point of view is worth 80 IQ points']
      ])
      t.end()
    })
    .catch(error => {
      t.fail(error)
      t.end()
    })
})
