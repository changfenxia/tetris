import './app.css'
import App from './App.svelte'

const target = document.getElementById('app')
if (!target) {
  console.error('Target element #app not found!')
} else {
  const app = new App({
    target,
  })

  export default app
}
