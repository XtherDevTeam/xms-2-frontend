import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { pdfjs } from 'react-pdf';
import { loader } from '@monaco-editor/react';
import * as Views from "./Views"
import reportWebVitals from './reportWebVitals';
import MainLayout from './components/MainLayout';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const workerPath = (process.env.PUBLIC_URL || '') + '/pdf.worker.min.mjs';
pdfjs.GlobalWorkerOptions.workerSrc = workerPath;

// Configure Monaco Editor to load from local source
loader.config({ paths: { vs: (process.env.PUBLIC_URL || '') + '/vs' } });

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
