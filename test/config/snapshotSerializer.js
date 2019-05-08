module.exports = {
  test: wrapper => wrapper && wrapper.debug,
  print: wrapper => wrapper.debug()
}