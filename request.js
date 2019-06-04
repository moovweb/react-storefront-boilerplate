const https = require('https')
const URL = require('url')

function sendReport() {
  return new Promise((resolve, reject) => {
    const options = {
      method: 'post',
      headers: {
        'content-type': 'application/json'
      },
      ...URL.parse('https://notify.bugsnag.com/')
    }

    const req = https.request(options, response => {
      response.on('data', data => {
        console.log('data', data.toString())
      })
      response.on('end', () => {
        resolve()
      })
    })

    req.write(
      JSON.stringify({
        apiKey: 'fce11e0641bb9ceae908b12e8ec7df32',
        payloadVersion: '5',
        notifier: {
          name: 'Moovweb'
        },
        events: [
          {
            exceptions: [
              {
                message: 'test',
                stacktrace:
                  'Error: test\n    at homeHandler (http://127.0.0.1:8080/moov_main.js:200600:9)\n    at _callee$ (http://127.0.0.1:8080/moov_main.js:21059:50)\n    at tryCatch (http://127.0.0.1:8080/moov_main.js:172667:40)\n    at Generator.invoke [as _invoke] (http://127.0.0.1:8080/moov_main.js:172893:22)\n    at Generator.prototype.(anonymous function) [as next] (http://127.0.0.1:8080/moov_main.js:172719:21)\n    at asyncGeneratorStep (http://127.0.0.1:8080/moov_main.js:22484:24)\n    at _next (http://127.0.0.1:8080/moov_main.js:22506:9)\n    at http://127.0.0.1:8080/moov_main.js:22513:7\n    at new Promise (http://127.0.0.1:8080/moov_main.js:65994:7)\n    at http://127.0.0.1:8080/moov_main.js:22502:12'
              }
            ],
            request: {
              httpMethod: 'GET',
              url: 'https://localhost/.json'
            }
          }
        ]
      })
    )

    req.end()
  })
}

sendReport().then(res => {
  console.log('send')
})
