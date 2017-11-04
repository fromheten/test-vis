# Plato test runner

* Type `Test` are JSON objects with fields `description`, `expression`, `expectation` & `context`.
* Type `Result` = `Expression`. A result is derived from a `Test`.
* Given a `List Test`, I can derive a `List Result`. That can then be rendered as a list of blue or red boxes (colour bind friendly and a hint to Japanese friends).


## Commands

* `yarn run html-open` will run the tests and open a browser (with the `open` command) with the output

## Plato IDs
A plato ID is the identity of any expression. Code and/or data.

Calling `["id" "any expression"]` with evaluate the expression and return it's Plato ID.

`["id", "Thank you, Socrates, Plato, Alan Kay, Joe Armstrong, John McCarthy & Paul Graham. A point of view is worth 80 IQ points. "]` gives `"plato:0:K15fdTwF0lDGzG5rM4lx3lLKCzy1+QTtyeOwTUd+3vY="`.

An expression containing a call to `plato` will before evaluation be replaced by the expression matching the ID.

```javascript
platoExpand(["plato", "plato:0:K15fdTwF0lDGzG5rM4lx3lLKCzy1+QTtyeOwTUd+3vY="]) // => "Thank you, Socrates, Plato, Alan Kay, Joe Armstrong, John McCarthy & Paul Graham. A point of view is worth 80 IQ points. "
```

`platoExpand` might get the expression from anywhere. It might come from memory, a disk, over the network. You don't need to trust the source, since `platoExpand` shall verify the hash. Remember, the ID is a hash, and a hash is a checksum.
