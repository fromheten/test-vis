// @flow
const first = require('./first.js')
const rest = require('./rest.js')
const {
  equals,
  and,
  range,
  path,
  not,
  isNil,
  isEmpty,
  map,
  assocPath,
  zip,
  reduce
} = require('ramda')

const paths = list => {
  const allPaths = []
  findPaths(list, allPaths, [])
  return allPaths.slice(1)
}

const findPaths = (list, allPaths, currentPath) => {
  const cursor = path(currentPath, list)
  allPaths.push(currentPath)
  if (!Array.isArray(cursor)) return

  const nextLevel = range(0, cursor.length)
  nextLevel.forEach(nextPath => {
    const nextLevelPath = currentPath.concat(nextPath)
    findPaths(list, allPaths, nextLevelPath)
  })
}

const isPlato = expression => equals(first(expression), 'plato')

const platoPaths = expression => {
  if (isPlato(expression)) {
    return [[]]
  } else {
    return paths(expression).filter(currentPath =>
      isPlato(path(currentPath, expression))
    )
  }
}

type Expression = *

const expand = (
  expression: Expression,
  lookerUpper: Promise<Expression>
): Promise<Expression> =>
  new Promise((resolve, reject) => {
    const cachedPaths = platoPaths(expression)
    if (isEmpty(cachedPaths)) {
      return resolve(expression) // Just like identity
    } else if (equals(cachedPaths, [[]])) {
      return resolve(lookerUpper(first(rest(expression))).then(JSON.parse))
    } else if (not(isEmpty(cachedPaths))) {
      const promiseList = map(
        currPath => lookerUpper(first(rest(path(currPath, expression)))),
        cachedPaths
      )
      return Promise.all(promiseList)
        .then(resolvedPromisesList =>
          resolve(
            reduce(
              (acc, pathExpressionPair) =>
                assocPath(pathExpressionPair[0], pathExpressionPair[1], acc),
              expression,
              zip(cachedPaths, map(JSON.parse)(resolvedPromisesList))
            )
          )
        )
        .catch(error => {
          console.log(error)
        })
    }
  })

module.exports = {
  expand,
  paths,
  isPlato,
  platoPaths
}
