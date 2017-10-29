const head = require("./head")
const tail = require("./tail")
const isSymbol = require("./isSymbol")
const bool = require("./bool")
const { equals, not } = require("ramda")
const cons = require("./cons")

const isUndefined = x => x === undefined
const isObject = x => typeof x === "object"

const second = x => head(tail(x))
const third = x => head(tail(tail(x)))

const e = function(form, context) {
  console.assert(not(isUndefined(form)), "not(isUndefined(form))", form)
  console.assert(isObject(context), "isObject(context)", context)
  if (isSymbol(form)) {
    return context[form]
  } else if (equals(head(form), "symbol?")) {
    return bool(isSymbol(head(form)))
  } else if (equals(head(form), "quote")) {
    return head(tail(form))
  } else if (equals(head(form), "equals?")) {
    return bool(
      equals(e(head(tail(form)), context), e(head(tail(tail(form))), context))
    )
  } else if (equals(head(form), "head")) {
    return e(head(tail(form)), context)
  } else if (equals(head(form), "tail")) {
    return tail(e(head(tail(form)), context))
  } else if (equals(head(form), "cons")) {
    return cons(
      e(head(tail(form)), context),
      e(head(tail(tail(form))), context)
    )
  }
}

module.exports = e
