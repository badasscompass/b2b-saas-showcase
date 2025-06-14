
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import './index.css'

// Add debugging for main initialization
console.log('Main.tsx initializing...');
console.log('Current pathname:', window.location.pathname);
console.log('Current origin:', window.location.origin);

createRoot(document.getElementById("root")!).render(
  <BrowserRouter basename="/">
    <App />
  </BrowserRouter>
);
