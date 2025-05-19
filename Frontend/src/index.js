// // import App from './Recense/App3'; 
// // import App from './Admin/App2'; 
// // import App from './Author/App1';
// // import App from './Registration/App';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './MainApp';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

