import { createGlobalStyle } from 'styled-components'
import reset from 'styled-reset'

export default createGlobalStyle`
${reset}

html, body, div, span, button {
  font-family: 'Montserrat', 'Helvetica Neue', 'Noto Sans', sans-serif;
  box-sizing: border-box;
}

monospace, code, pre {
  font-family: 'Hack', 'Hasklig', 'Fantasque Sans Mono', 'Fira Code', monospace;
}
`
