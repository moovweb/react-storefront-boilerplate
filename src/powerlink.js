export default function powerLink({ to }, request, response) {
  response.set('content-type', 'application/javascript')

  const url = `${to}${request.search}${request.search.indexOf('?') === -1 ? '?' : '&'}powerlink`

  response.send(`
    var el = document.createElement('iframe');
    el.setAttribute('src', 'https://${request.hostname}/pwa/install-service-worker.html?powerlink=${encodeURIComponent(url)}');
    el.setAttribute('style', 'height:1px;width:1px;');
    el.setAttribute('frameborder', '0');
    document.body.appendChild(el);
  `)
}