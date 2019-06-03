import router from "../../src/routes";
import url from 'url'

function buildCacheKey(match, params) {
  if (!match) return null
  return params.id
}

export const handler = (event, context, callback) => {

  const request = event.Records ? event.Records[0].cf.request : event;
    
  const { match, params } = router.findMatchingRoute(request)
  console.log('match', match);
  console.log('params', params);

  request.headers['x-cache-key'] = buildCacheKey(match, params)

  callback(null, request)
};

// AWS Lambda event -> Request transformer code
// This code below was taken from https://github.com/awslabs/aws-serverless-express
// Sadly, it does not export this function, so we just copied it

function getPathWithQueryStringParams (event) {
  return url.format({ pathname: event.path, query: event.queryStringParameters })
}

function getEventBody (event) {
  return Buffer.from(event.body, event.isBase64Encoded ? 'base64' : 'utf8')
}

function clone (json) {
  return JSON.parse(JSON.stringify(json))
}

function mapApiGatewayEventToHttpRequest (event, context, socketPath="random") {
  const headers = Object.assign({}, event.headers)

  // NOTE: API Gateway is not setting Content-Length header on requests even when they have a body
  if (event.body && !headers['Content-Length']) {
    const body = getEventBody(event)
    headers['Content-Length'] = Buffer.byteLength(body)
  }

  const clonedEventWithoutBody = clone(event)
  delete clonedEventWithoutBody.body

  headers['x-apigateway-event'] = encodeURIComponent(JSON.stringify(clonedEventWithoutBody))
  headers['x-apigateway-context'] = encodeURIComponent(JSON.stringify(context))

  return {
    method: event.httpMethod,
    path: getPathWithQueryStringParams(event),
    headers,
    socketPath
    // protocol: `${headers['X-Forwarded-Proto']}:`,
    // host: headers.Host,
    // hostname: headers.Host, // Alias for host
    // port: headers['X-Forwarded-Port']
  }
}
