import React from "react";
import ReactDOM from "react-dom/client";
import {
  createRoutesFromElements,
  createBrowserRouter,
  RouterProvider,
  Route,
} from "react-router-dom";
import PocketBase from "pocketbase";

import App from "./App.tsx";
import "./index.css";
import { PocketBaseProvider } from "./hooks";
import { AdminPage } from "./pages/Admin.tsx";

const PB_URL = import.meta.env.VITE_PB_URL;
const pb = new PocketBase(PB_URL);

// window.pb = pb;

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />} errorElement={<div>404</div>}>
      <Route path="admin" element={<AdminPage />} />
      <Route path="map" element={<div>Map</div>} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <PocketBaseProvider value={pb}>
      <RouterProvider router={router} />
    </PocketBaseProvider>
  </React.StrictMode>
);
