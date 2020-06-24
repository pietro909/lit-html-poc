import litHtmlServer from '@popeindustries/lit-html-server'
import lhsClassMap from '@popeindustries/lit-html-server/directives/class-map.js'
import lhsUntil from '@popeindustries/lit-html-server/directives/until.js'
import lhsRepeat from '@popeindustries/lit-html-server/directives/repeat.js';
import graphqlRequest from '@testmail.app/graphql-request'

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


const query =  `
  query FootballFixtures($input: FixturesInput!) {
    fixtures(input: $input) {
      fixtures {
        id,
        competition,
        name,
        region,
        startTime,
        status
      },
      cursor
    }
  }
`



async function fetchRemoteData(api) {
  return graphqlRequest.request(
    'https://api.testing.betr.app/graphql',
    query,
    { input: { first: 20 } }
  ).then(({fixtures}) => fixtures.fixtures)
}

const upcomingFixtures = fixtures => html`
  <section>
      <ul>
        ${lhsRepeat.repeat(fixtures, (i) => i.id, (i, index) => html`
          <li>${i.name}</li>`)
        }
      </ul>
  </section>
`

async function Body(api) {
  // Some Promise-based request method
  const data = await fetchRemoteData(api);

  return html`
    <h1>${data.title}</h1>
    ${upcomingFixtures(data)}
    <x-widget ?enabled="${data.hasWidget}"></x-widget>
    <p class="${classMap({ negative: data.invertedText })}">${data.text}</p>
  `;
}
