const platoEval = require("./eval")

module.exports = test => platoEval(test.expression, test.context)
