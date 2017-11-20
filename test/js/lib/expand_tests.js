const test = require("tape")
const { equals } = require("ramda")
const { expand, paths, oneLevelPaths } = require("../../../lib/expand")

test("expanding an expression with no plato calls returns like identity", t => {
  t.deepLooseEqual(expand(["cons", ["quote", "a"], ["quote", "b"]]), [
    "cons",
    ["quote", "a"],
    ["quote", "b"]
  ])
  t.end()
})

test("path gen", t => {
  // Thanks Matt!
  t.deepLooseEqual(paths([["x", "y"], [["z"]], "nfa"]), [
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
