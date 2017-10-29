const platoEval = require("./eval")

module.exports = test => {
  const res = platoEval(test.expression, test.context)

  if (res === undefined) {
    return "EVAL ERROR - NO RESULT"
  } else {
    return res
  }
}
