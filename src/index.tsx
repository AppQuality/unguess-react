import { createRoot } from 'react-dom/client';
import { getWorkspaces } from 'src/features/workspaces/actions';
import App from './app/App';
import { store } from './app/store';
import reportWebVitals from './reportWebVitals';

const container = document.getElementById('root');
const root = createRoot(container!); // createRoot(container!) if you use TypeScript

store.dispatch(getWorkspaces());

root.render(<App />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
