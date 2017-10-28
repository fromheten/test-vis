const head = require("./head")
const tail = require("./tail")
const { equals } = require("ramda")

module.exports = function(form, context) {
  if (equals(head(form), "quote")) {
    return head(tail(form))
  }
}
