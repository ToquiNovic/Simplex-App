import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter} from "react-router-dom";
import './App.css';
import './index.css';
import 'react-vis/dist/style.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";




ReactDOM.render(<BrowserRouter basename={process.env.PUBLIC_URL}><App /></BrowserRouter>, document.getElementById('root'));

serviceWorkerRegistration.register({
    onUpdate: async (registration) => {
      // Corremos este código si hay una nueva versión de nuestra app
      // Detalles en: https://developers.google.com/web/fundamentals/primers/service-workers/lifecycle
      if (registration && registration.waiting) {
        await registration.unregister();
        registration.waiting.postMessage({ type: "SKIP_WAITING" });
        // Des-registramos el SW para recargar la página y obtener la nueva versión. Lo cual permite que el navegador descargue lo nuevo y que invalida la cache que tenía previamente.
        window.location.reload();
      }
    },
  });
