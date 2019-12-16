import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import MainReducer from './reducers/MainReducer'
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter } from 'react-router-dom'
import thunk from 'redux-thunk'
import { CookiesProvider } from 'react-cookie'
//import '../node_modules/elemental/less/elemental.less'

const store = createStore(MainReducer, applyMiddleware(thunk));

ReactDOM.render(
	<CookiesProvider>
		<BrowserRouter>
			<Provider store={store}>
				<App />
			</Provider>
	  	</BrowserRouter>
	</CookiesProvider>
, document.getElementById('root'));
registerServiceWorker();
