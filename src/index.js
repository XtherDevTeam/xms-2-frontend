import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { GlobalWorkerOptions } from 'pdfjs-dist';
import * as Views from "./Views"
import reportWebVitals from './reportWebVitals';
import MainLayout from './components/MainLayout';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

// Hack to prevent dependencies (like react-doc-render) from overwriting the worker path.
// We use defineProperty to make it 'read-only' after setting it correctly.
const workerPath = (process.env.PUBLIC_URL || '') + '/pdf.worker.min.js';

try {
  Object.defineProperty(GlobalWorkerOptions, 'workerSrc', {
    get: () => workerPath,
    set: () => {}, // Disable setting
    configurable: false
  });
} catch (e) {
  // Fallback if property is already defined as non-configurable
  GlobalWorkerOptions.workerSrc = workerPath;
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Views.Home />,
  },
  {
    path: "/signin",
    element: <Views.SignIn />,
  },
  {
    path: "/signup",
    element: <Views.SignUp />,
  },
  {
    path: "/sharelink/:id",
    element: <Views.ShareLink />,
  },
  {
    path: "/spec",
    element: <Views.SpecPage />,
  },
  {
    path: "*",
    element: <Views.NotMatch />,
  },
], { basename: "/xms" });

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <MainLayout>
    <RouterProvider router={router} />
  </MainLayout>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
