function deepCopy(input) {
  // WARNING: This will only work for JSON compatible objects.
  return JSON.parse(JSON.stringify(input))
}

export {
  deepCopy
}