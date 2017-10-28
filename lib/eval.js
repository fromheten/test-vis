const head = require("./head")
const tail = require("./tail")
const isSymbol = require("./isSymbol")
const { equals } = require("ramda")

module.exports = function(form, context) {
  if (isSymbol(form)) {
    return context[form]
  } else if (equals(head(form), "quote")) {
    return head(tail(form))
  }
}
