import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from './hooks/router';
import Router from './components/Router';

// Remove prerendered static content once React takes over
const staticContent = document.getElementById('static-content');
if (staticContent) {
  staticContent.remove();
}

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <RouterProvider>
      <Router />
    </RouterProvider>
  </React.StrictMode>
);
