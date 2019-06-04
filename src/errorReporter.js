import { isServer } from 'react-storefront/environment'

const createBugsnagReporter = config => {
  let client

  if (isServer()) {
    client = new MoovBugsnagClient(config)
  } else {
    // client = require('@bugsnag/js')(config)
  }

  return ({ error, app, history }) => {
    if (!error) {
      return
    }

    client.notify(error, {
      beforeSend: report => {
        const context = {}

        if (history) {
          context.url = history.location.pathname + history.location.search
        }

        if (app && app.page) {
          context.page = app.page
        }

        report.updateMetaData('context', context)
      }
    })
  }
}

class MoovBugsnagClient {
  constructor({ apiKey }) {
    this.apiKey = apiKey
  }

  async notify(error) {
    try {
      const request = global.env.rsf_request
      const { apiKey } = this

      const body = {
        apiKey,
        payloadVersion: '5',
        notifier: {
          name: 'Moovweb'
        },
        events: [
          {
            exceptions: [
              {
                message: error.message,
                stacktrace: error.stack
              }
            ],
            request: {
              httpMethod: `${request.method}`,
              url: `https://${request.hostname}${request.path}${request.search}`,
              referer: request.headers.get('referer')
            }
          }
        ]
      }

      const headers = { 'content-type': 'application/json' }

      const payload = JSON.stringify(body, null, '  ')

      // const response = await fetch('https://notify.bugsnag.com/', {
      //   method: 'post',
      //   body: payload,
      //   headers
      // }).then(res => {
      //   console.log('res', res)
      //   return res.json()
      // })

      await sendReport(payload)
      console.log('reported')
    } catch (e) {
      console.log('error sending bug report', e)
    }
  }
}

function sendReport(body) {
  return new Promise((resolve, reject) => {
    const options = {
      method: 'post',
      hostname: 'notify.bugsnag.com',
      path: '/',
      headers: {
        'content-type': 'application/json'
      }
    }

    console.log('options', options)

    const req = global.https.request(options, response => {
      response.on('data', data => {
        console.log('data', data.toString())
      })
      response.on('end', () => {
        resolve()
      })
    })

    req.write(body)
    req.end()
  })
}

export default createBugsnagReporter({
  apiKey: 'fce11e0641bb9ceae908b12e8ec7df32'
})
