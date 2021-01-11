//STATE

function pipe(...funcs) {
  return (...x) =>
    funcs.reduce(
      (acc, current, i) => (i !== 0 ? current(acc) : acc),
      funcs[0](...x)
    )
}