import "./app.css";
// eslint-disable-next-line no-unused-vars
import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Register from "./register"
// Import your page components
import LoginPage from "./login";
import "./home.css"

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <div>Home Page!</div>,
    },
    {
      path: "/login",
      element: <LoginPage />, // Use the imported LoginPage component
    },
    {
      path:"/register",
      element:<Register/>
    }
  ]);

  return (
    <div>
      <nav>
        <a href="/">Home</a>
        <a href="/login">Login</a>
        <a href="/register">register</a>
      </nav>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;