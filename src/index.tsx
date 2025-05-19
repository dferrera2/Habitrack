// src/index.tsx
import ReactDOM from 'react-dom/client';
import './index.css';  // Asegúrate de que el archivo de estilos esté importado
import App from './App';  // Importa el componente principal de la aplicación
import { BrowserRouter } from 'react-router-dom';  // Si usas React Router para la navegación

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
