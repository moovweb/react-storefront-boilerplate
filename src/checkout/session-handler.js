import { createSessionId } from 'react-storefront-extensions/shopify'

export default function sessionHandler(params, request, response) {
  return createSessionId().then(sessionId => {
  	console.log('Created session id', sessionId);
  	response.set('Set-Cookie', 'sessionid=' + sessionId);
  	return response.json({ success: true });
  });
} 
