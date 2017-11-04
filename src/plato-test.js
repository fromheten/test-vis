const tests = require("../tests/eval-tests.json")
const { map, assoc, equals } = require("ramda")
const result = require("../lib/result")

function main() {
  console.log('eval tests:', map(t => equals(result(t), t.expectation), tests))
}

main()
