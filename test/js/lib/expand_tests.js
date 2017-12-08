// @flow
const test = require('tape')
const { equals, not } = require('ramda')
const { expand, paths, isPlato, platoPaths } = require('../../../lib/expand')

test('expanding an expression with no plato calls returns like identity', t => {
  t.deepLooseEqual(expand(['cons', ['quote', 'a'], ['quote', 'b']]), [
    'cons',
    ['quote', 'a'],
    ['quote', 'b']
  ])
  t.end()
})

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
