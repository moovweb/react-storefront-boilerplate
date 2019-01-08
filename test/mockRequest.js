import { Response } from 'react-storefront/router'
import createRequest from 'react-storefront/platform/createRequest'

export default function mockRequest({ protocol="https", hostname='localhost', method="GET", path="/", headers={}, body={} } = {}) {
  global.env = {
    method, 
    path, 
    protocol,
    host_no_port: hostname,
    headers: JSON.stringify(headers),
    secure: protocol === 'https',
    host: hostname,
    body: typeof body === 'string' ? body : JSON.stringify(body)
  }
  const request = createRequest()
  const response = new Response(request)
  return { request, response }
}