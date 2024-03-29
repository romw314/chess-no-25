import { useState, useEffect } from 'react';
import { Alert, AlertTitle, Button } from '@mui/material';

function ErrorHandler({ error, children }) {
	const reerror = useState(null)[1];
	error = global.error;
	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(() => { setInterval(() => reerror(Math.random()), 100); }, []);
	if (error) {
		const lines = error.stack.split(/\r?\n/);
		const title = lines.shift();
		const body = lines.join('\n');
		return (
			<Alert severity="error">
				<AlertTitle>{title}</AlertTitle>
				{body}
				<hr/>
				<Button onClick={() => global.error = null} variant="outlined" color="error">Ignore</Button>
			</Alert>
		);
	}
	return children;
}

function handleErrors(f) {
	try { f(); }
	catch (e) { global.error = e; }
}

export default ErrorHandler;
export { handleErrors };
