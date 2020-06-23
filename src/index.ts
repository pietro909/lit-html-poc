// Import lit-html functions
import { html, render } from 'lit-html';
import {styleMap} from 'lit-html/directives/style-map.js';
import {subscribe, toggleSidebar, init} from "./state";
import { logo, burger, person } from './icons';
import {sidebar} from './sidebar';

const account = html`
  <div>
    ${person}
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
      ${headerSection(logo)}
      ${headerSection("My Bets")}
      ${headerSection(account)}
    </header>
  `

const upcomingFixtures = html`<section></section>`

const popularCompetitions = [{
  id: "x", name: "Serie A"
}]

const app = (state) => {
  return html`
    ${header}
    ${state.showSidebar ? sidebar({ popularCompetitions }) : ''}
    ${upcomingFixtures}
  `;
}

subscribe(nextState => {
  render(app(nextState), document.body);
})

init()
