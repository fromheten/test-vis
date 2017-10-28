// Takes a List TestWithResult and outputs a HTML string
const { map, equals, not } = require("ramda")

const testEntry = test => {
  const isPassing = equals(test.expectation, test.result)
  return `
<li class=${isPassing ? "passing" : "failing"}>
${test.description}
${not(isPassing)
    ? "<br/>" + "<pre>" + JSON.stringify(test, null, 2) + "</pre>"
    : ""}
</li>
`
}

module.exports = testsList => `
<style> .passing {background-color: lightblue} .failing {background-color: red}
</style>
<ul>
${map(testEntry, testsList)}
</ul>
`
