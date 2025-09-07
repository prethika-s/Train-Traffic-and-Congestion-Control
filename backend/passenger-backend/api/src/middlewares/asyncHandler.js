// Wraps async controllers so we don't repeat try/catch everywhere
export default function asyncHandler(fn) {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next)
  }
}
