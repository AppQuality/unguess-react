import { getWorkspaces } from 'src/features/workspaces/actions';
import { createRoot } from 'react-dom/client';
import App from './app/App';
import { store } from './app/store';
import { fetchUser } from './features/user/actions/fetchUser';
import reportWebVitals from './reportWebVitals';

const container = document.getElementById('root');
const root = createRoot(container!); // createRoot(container!) if you use TypeScript

store.dispatch(fetchUser());
store.dispatch(getWorkspaces());

root.render(<App />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
