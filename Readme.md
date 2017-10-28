# Plato test runner

* Type `Test` are JSON objects with fields `description`, `expression`, `expectation` & `context`.
* Type `Result` = `Expression`. A result is derived from a `Test`.
* Given a `List Test`, I can derive a `List Result`. That can then be rendered as a list of blue or red boxes (colour bind friendly and a hint to Japanese friends).


## Commands

* `yarn run html-open` will run the tests and open a browser (with the `open` command) with the output
