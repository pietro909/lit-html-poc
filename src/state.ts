const state = { showSidebar: false }

export function toggleSidebar() {
  state.showSidebar = !state.showSidebar
  trigger()
}

const listeners = []
export function subscribe(fn) {
   listeners.push(fn)
}

function trigger() {
  listeners.forEach(fn => fn(state))
}

export function init() {
  trigger()
}