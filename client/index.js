import litHtmlServer from '@popeindustries/lit-html-server'
import lhsClassMap from '@popeindustries/lit-html-server/directives/class-map.js'
import lhsUntil from '@popeindustries/lit-html-server/directives/until.js'
import lhsRepeat from '@popeindustries/lit-html-server/directives/repeat.js';
import lhsStyleMap from '@popeindustries/lit-html-server/directives/style-map.js';
import graphqlRequest from '@testmail.app/graphql-request'

import * as icons from './icons.js';
import {subscribe, toggleSidebar, init} from "./state.js";

const { html } = litHtmlServer
const { classMap } = lhsClassMap
const { until } = lhsUntil
const {styleMap} = lhsStyleMap

const account = html`
  <div>
    ${icons.person}
  </div>
`

const headerSection = content => {
  const styles = { display: "flex", flex: "auto" }
  return html`<span style=${styleMap(styles)}>${content}</span>`
}

const header = html`
    <header>
      ${headerSection(html`<button @click="${toggleSidebar}" >burger</button>`)}
      ${headerSection("A-Z")}
      ${headerSection("Live")}
      ${headerSection(icons.logo)}
      ${headerSection("My Bets")}
      ${headerSection(account)}
    </header>
  `



export default function Layout(data) {
  return html`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <title>${data.title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta name="description" content="Project TIA" />
        <link rel="stylesheet" type="text/css" href="public/styles.css">
      </head>
      <body>
        ${header}
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
