const first = require("./first")
const rest = require("./rest")
const isSymbol = require("./isSymbol")
const bool = require("./bool")
const { equals, not } = require("ramda")
const cons = require("./cons")
const isT = require("./isT")
const isF = require("./isF")

const isUndefined = x => x === undefined
const isObject = x => typeof x === "object"

const second = x => first(rest(x))
const third = x => first(rest(rest(x)))

const e = function(form, context) {
  console.assert(not(isUndefined(form)), "not(isUndefined(form))", form)
  console.assert(isObject(context), "isObject(context)", context)
  if (isSymbol(form)) {
    if (isT(form) || isF(form)) {
      return form
    } else {
      return context[form]
    }
  } else if (equals(first(form), "symbol?")) {
    return bool(isSymbol(first(form)))
  } else if (equals(first(form), "quote")) {
    return first(rest(form))
  } else if (equals(first(form), "equals?")) {
    return bool(
      equals(e(first(rest(form)), context), e(first(rest(rest(form))), context))
    )
  } else if (equals(first(form), "first")) {
    return e(first(rest(form)), context)
  } else if (equals(first(form), "rest")) {
    return rest(e(first(rest(form)), context))
  } else if (equals(first(form), "cons")) {
    return cons(
      e(first(rest(form)), context),
      e(first(rest(rest(form))), context)
    )
  }
}

module.exports = e
