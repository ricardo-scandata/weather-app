import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

//import the StoreProvider wrapper
import {StoreProvider} from "./components/Store/Store";

ReactDOM.render(
<StoreProvider>
    <App />
</StoreProvider>
, document.getElementById('root'));


serviceWorker.unregister();