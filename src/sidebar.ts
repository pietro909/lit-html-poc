import { html, render } from 'lit-html';
import {repeat} from 'lit-html/directives/repeat';

export const sidebar = ({ popularCompetitions }) => html`
  <aside>
    <div>
      <input type="text" placeholder="Search"/>
      <ul>
        ${repeat(popularCompetitions, (i) => i.id, (i, index) => html`
          <li>${i.name}</li>`)
        }
      </ul>
    </div>
  </aside>
`
