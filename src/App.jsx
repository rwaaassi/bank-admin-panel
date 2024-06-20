import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home/Home";
import User from "./pages/User/User";
import "./App.css";

const routes = [
  {
    path: "/",
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "user/:userId",
        element: <User />,
      },
    ],
  },
];

function App() {
  const router = createBrowserRouter(routes);

  return <RouterProvider router={router} />;
}

export default App;
