const tests = require("../test.json")
const result = require("../lib/result")
const html = require("../lib/html")
const { map, assoc } = require("ramda")

function main() {
  console.log(html(map(t => assoc("result", result(t), t), tests)))
}

main()
