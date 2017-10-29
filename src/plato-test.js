const tests = require("../test.json")
const { map, assoc, equals } = require("ramda")
const result = require("../lib/result")

function main() {
  map(t => equals(result(t), t.expectation), tests)
}

main()
