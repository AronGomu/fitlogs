import './app.css'
import App from './App.svelte'

console.log("BEFORE MAIN");
const app = new App({
  target: document.getElementById('app'),
})
console.log("POST APP ASSIGNATION");
console.log(app);

if ('serviceWorker' in navigator) {
  console.log("SERVICE WORKER IN NVAIGATOR");
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js');
  });
}

console.log("POST SERVICE WORKER");

export default app
