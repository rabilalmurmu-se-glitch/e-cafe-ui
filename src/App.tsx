import React from "react";
import { RouterProvider } from "react-router-dom";
import { routers } from "./Routes";

const App: React.FC = () => {
  return <RouterProvider router={routers} />;
};

export default App;
