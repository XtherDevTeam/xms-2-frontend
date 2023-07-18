import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import * as Views from "./Views"
import reportWebVitals from './reportWebVitals';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";


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
    path: "/player",
    element: <Views.Player />,
  },
  {
    path: "*",
    element: <Views.NotMatch />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <RouterProvider router={router} />
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
