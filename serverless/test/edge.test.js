const mockEvent = require('./event.json')
const edge = require('../dist/edge')

edge.handler(mockEvent, {}, (err, req) => {
  console.log(JSON.stringify(req, null, 3))
});
