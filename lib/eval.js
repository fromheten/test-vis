const first = require("./first")
const rest = require("./rest")
const isSymbol = require("./isSymbol")
const bool = require("./bool")
const cons = require("./cons")
const isT = require("./isT")
const isF = require("./isF")

const { equals, not, zipObj, map } = require("ramda")

const isUndefined = x => x === undefined
const isObject = x => typeof x === "object"
const isList = Array.isArray

const second = x => first(rest(x))
const third = x => first(rest(rest(x)))
const fourth = x => first(rest(rest(rest(x))))

const e = function(form, context) {
  console.assert(not(isUndefined(form)), "not(isUndefined(form))", form)
  console.assert(isObject(context), "isObject(context)", context)
  if (isSymbol(form)) {
    if (isT(form) || isF(form)) {
      return form
    } else {
      return context[form]
    }
  } else if (isList(form)) {
    if (equals(first(form), "symbol?")) {
      return bool(isSymbol(first(form)))
    } else if (equals(first(form), "quote")) {
      return first(rest(form))
    } else if (equals(first(form), "equals?")) {
      return bool(
        equals(
          e(first(rest(form)), context),
          e(first(rest(rest(form))), context)
        )
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
    } else if (equals(first(form), "if")) {
      if (isT(e(second(form), context))) {
        return e(third(form), context)
      } else if (isF(e(second(form), context))) {
        return e(fourth(form), context)
      }
    } else if (equals(first(first(form)), "lambda")) {
      return e(
        first(rest(rest(first(form)))),
        zipObj(first(rest(first(form))), map(f => e(f, context), rest(form)))
      )
    } else if (equals(first(form), "lambda")) {
      return form
    } else if (not(isUndefined(context[first(form)]))) {
      return e(cons(context[first(form)], rest(form)), context)
    }
  }
}

module.exports = e
