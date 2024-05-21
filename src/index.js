import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { ThemedApp } from './App';
import Home, { HomePage, ThemesPage } from './Home';
import { DebugRunProvider, setLg } from './DebugRunContext';
import ErrorHandler from './ErrorHandler';
import './debug';
import reportWebVitals from './reportWebVitals';
import { Routes, Route } from 'react-router-dom';
import { Router } from './router';

if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
	console.log(`Welcome to Chess No. 25 debugger console!
@
	You can change log level by calling the loglevel function. The default log level is 2.`);
	global.uselog = 2;
}

setLg(f => f());

global.error = null;
global.catch = (error) => global.error = error;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<Router>
			<Routes>
				<Route path="/" element={<Home />}>
					<Route index element={<HomePage />} />
					<Route path="themes" element={<ThemesPage />} />
				</Route>
				<Route path="/play/" element={
					<ErrorHandler error={global.error}>
						<DebugRunProvider>
							<ThemedApp />
						</DebugRunProvider>
					</ErrorHandler>
				} />
			</Routes>
		</Router>
	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
