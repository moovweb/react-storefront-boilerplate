import fetch from 'fetch'
import parse from 'react-storefront-extensions/html/parse'

export default async function proxyHandler(params, request, response) {
  const contentType = env.content_type || ''

  if (contentType.indexOf('html') > -1) {
    fns.init$(body)

    const port = request.port === '443' ? '' : `:${request.port}`
    const url = `${request.protocol}//${request.hostname}${port}/header.json`
    const { html, style, componentScript, initialStateScript } = await fetch(url).then(res =>
      res.json()
    )

    // remove the existing header
    $body.find('.navbar').remove()

    // add the new header and supporting resources to the document
    const $header = $(tag('div', { class: 'mw-header' })).append(html)
    const $style = $(tag('style', {})).append(style)

    $body.prepend($header)
    $head.append($style)
    $body.append(initialStateScript)
    $body.append(componentScript)

    response.send($.html())
  } else {
    sendResponse({ htmlparsed: false })
  }
}
