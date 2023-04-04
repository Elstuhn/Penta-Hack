<<<<<<< HEAD
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import "./index.css";
=======
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import "./index.css"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()
>>>>>>> c94429a81a8512bda2dc90e1bb8606d8250e704a

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
    <App />
<<<<<<< HEAD
  </React.StrictMode>
);
=======
    </QueryClientProvider>
  </React.StrictMode>,
)
>>>>>>> c94429a81a8512bda2dc90e1bb8606d8250e704a
