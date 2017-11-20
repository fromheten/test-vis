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

module.exports = {
  expand,
  paths,
  oneLevelPaths
}
