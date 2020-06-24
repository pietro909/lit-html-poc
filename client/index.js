import litHtmlServer from '@popeindustries/lit-html-server'
import lhsClassMap from '@popeindustries/lit-html-server/directives/class-map.js'
import lhsUntil from '@popeindustries/lit-html-server/directives/until.js'

const { html } = litHtmlServer
const { classMap } = lhsClassMap
const { until } = lhsUntil

export default function Layout(data) {
  return html`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <title>${data.title}</title>
      </head>
      <body>
        ${until(Body(data.api))}
      </body>
    </html>
  `;
}

async function fetchRemoteData(api) {
  return Promise.resolve({title: "a lot of fixtures", hasWidget: true, invertedText: true})
}

async function Body(api) {
  // Some Promise-based request method
  const data = await fetchRemoteData(api);

  return html`
    <h1>${data.title}</h1>
    <x-widget ?enabled="${data.hasWidget}"></x-widget>
    <p class="${classMap({ negative: data.invertedText })}">${data.text}</p>
  `;
}
