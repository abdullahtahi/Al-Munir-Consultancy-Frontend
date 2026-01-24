import React from 'react';
import ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import App from './App';
import store from './store';
import './utils/i18n';
import Spinner from './views/spinner/Spinner';

async function deferRender() {
  const { worker } = await import('./api/mocks/browser');
  return worker.start({
    onUnhandledRequest: 'bypass',
  });
}

deferRender().then(() => {
  const rootElement = document.getElementById('root');
  if (!rootElement) {
    throw new Error('Root element not found');
  }

  ReactDOM.createRoot(rootElement).render(
    <Provider store={store}>
      <HelmetProvider>
        <React.Suspense fallback={<Spinner />}>
          <App />
        </React.Suspense>
      </HelmetProvider>
    </Provider>
  );
});
