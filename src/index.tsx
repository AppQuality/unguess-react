import React from 'react';
import ReactDOM from 'react-dom';
import { getWorkspaces } from 'src/features/workspaces/actions';
import App from './app/App';
import { store } from './app/store';
import { fetchUser } from './features/user/actions/fetchUser';
import reportWebVitals from './reportWebVitals';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

const main = () => {
  store.dispatch(fetchUser());
  store.dispatch(getWorkspaces());

  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById('root')
  );
};

main();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
