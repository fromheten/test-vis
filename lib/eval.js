// @flow
const first = require('./first')
const rest = require('./rest')
const isSymbol = require('./isSymbol')
const bool = require('./bool')
const cons = require('./cons')
const isT = require('./isT')
const isF = require('./isF')

const { equals, not, zipObj, map } = require('ramda')

const isUndefined = x => x === undefined
const isObject = x => typeof x === 'object'
const isList = Array.isArray

const second = x => first(rest(x))
const third = x => first(rest(rest(x)))
const fourth = x => first(rest(rest(rest(x))))

const sha3 = string =>
  require('keccak')('keccak256')
    .update(string)
    .digest()
    .toString('base64')

const e = function(form: Expression, context: { [name: string]: Expression }) {
  console.assert(not(isUndefined(form)), 'not(isUndefined(form))', form)
  console.assert(isObject(context), 'isObject(context)', context)
  tco: while (true) {
    if (isSymbol(form)) {
      if (isT(form) || isF(form)) {
        return form
      } else {
        return context[form]
      }
    } else if (isList(form)) {
      if (equals(first(form), 'symbol?')) {
        return bool(isSymbol(first(form)))
      } else if (equals(first(form), 'quote')) {
        return first(rest(form))
      } else if (equals(first(form), 'equals?')) {
        return bool(
          equals(
            e(first(rest(form)), context),
            e(first(rest(rest(form))), context)
          )
        )
      } else if (equals(first(form), 'first')) {
        return e(first(rest(form)), context)
      } else if (equals(first(form), 'rest')) {
        return rest(e(first(rest(form)), context))
      } else if (equals(first(form), 'cons')) {
        return cons(
          e(first(rest(form)), context),
          e(first(rest(rest(form))), context)
        )
      } else if (equals(first(form), 'if')) {
        if (isT(e(second(form), context))) {
          return e(third(form), context)
        } else if (isF(e(second(form), context))) {
          return e(fourth(form), context)
        }
      } else if (equals(first(form), 'lambda')) {
        return form
      } else if (equals(first(form), 'id')) {
        return 'plato:0:' + sha3(JSON.stringify(e(first(rest(form)), context)))
      } else {
        // assume it's a function call
        const newForm = map(item => e(item, context), form)
        form = first(rest(rest(first(newForm))))
        context = zipObj(first(rest(first(newForm))), rest(newForm))
        continue tco
        // Original non-tail-call-optimized version
        /* return e(
         *   first(rest(rest(first(newForm)))),
         *   zipObj(first(rest(first(newForm))), rest(newForm))
         *   )*/
      }
    }
  }
}

module.exports = e
