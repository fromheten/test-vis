const first = require("./first.js")
const { equals, and, range, path, not, isNil } = require("ramda")

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

const expand = expression => expression

const isPlato = expression => equals(first(expression), "plato")

const platoPaths = expression => {
  if (isPlato(expression)) {
    return [[]]
  } else {
    return paths(expression).filter(currentPath =>
      isPlato(path(currentPath, expression))
    )
  }
}

module.exports = {
  expand,
  paths,
  isPlato,
  platoPaths
}
