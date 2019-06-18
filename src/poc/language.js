export default function language(params, request) {
  return { language: request.cookies['language'] }
}