import React from 'react';
import ReactDOM from 'react-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import App from './App';

const queryClient = new QueryClient();

const rootElement = document.getElementById('root');
const app = (
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
);

// Replace ReactDOM.render with createRoot
if (rootElement?.hasChildNodes()) {
  ReactDOM.hydrate(app, rootElement);
} else {
  ReactDOM.render(app, rootElement);
}
