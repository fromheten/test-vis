module.exports = form => {
  console.assert(
    typeof form === "boolean",
    "TypeError - non-boolean given to `bool`"
  )
  return form ? "t" : "f"
}
