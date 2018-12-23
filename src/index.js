import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import './styles/style.css';
import * as serviceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
serviceWorker.register();
