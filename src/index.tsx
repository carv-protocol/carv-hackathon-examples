import ReactDOM from 'react-dom/client';
import App from './App';

import 'virtual:windi.css';

import 'virtual:svg-icons-register';

import { BrowserRouter } from 'react-router-dom';

const root = document.getElementById('root') as Element;

ReactDOM.createRoot(root).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
