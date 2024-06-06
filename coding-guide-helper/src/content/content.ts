import { Environment } from '../app.types'

console.info(
  'Extensions can run scripts that read and modify the content of a page',
  document.location.href,
  Environment,
)

// const element = document.querySelector("body");
// element.style.color = "red";
