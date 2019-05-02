export default function errorHandler(e, params, request, response) {
  response.status(500)

  return {
    page: 'Error',
    error: e.message,
    loading: false,
    stack: e.stack
  }
}