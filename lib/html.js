// Takes a List TestWithResult and outputs a HTML string
const { map, equals } = require("ramda")

const testEntry = test => `
<li class=${equals(test.expectation, test.result) ? "passing" : "failing"}>
${test.description}
</li>
`

module.exports = testsList => `
<style> .passing {background-color: lightblue} .failing {background-color: red}
</style>
<ul>
${map(testEntry, testsList)}
</ul>
`
