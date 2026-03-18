import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { HashRouter , BrowserRouter  } from "react-router-dom";

import { Provider } from "react-redux";
import  store  from "../src/Redux_Toolkit/Store.js";


createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <HashRouter  >
      <StrictMode >
        <App />
      </StrictMode>
    </HashRouter >
  </Provider>,
)
