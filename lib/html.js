// Takes a List TestWithResult and outputs a HTML string
const { map, equals, not } = require("ramda")

const testEntry = test => {
  const isPassing = equals(test.expectation, test.result)
  return `
<li class=${isPassing ? "passing" : "failing"}>
${test.description}
${not(isPassing) ? "<br/>" + "<pre>" + JSON.stringify(test) + "</pre>" : ""}
</li>
`
}

module.exports = testsList => {
  return `
  <!doctype html>
  <html>
  <head>
  <meta charset="UTF-8">
  <style> .passing {background-color: lightblue} .failing {background-color: tomato}</style>
  </head>
  <body>
  <ul>
  ${map(testEntry, testsList)}
  </ul>
</body>
`
}
