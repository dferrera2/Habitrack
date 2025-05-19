// src/index.tsx
import ReactDOM from 'react-dom/client'; // Esto es para React 18
import './index.css';  // Asegúrate de que los estilos globales estén importados
import App from './App';
import { BrowserRouter } from 'react-router-dom'; // Si estás utilizando React Router

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
