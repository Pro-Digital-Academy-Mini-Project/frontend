import mainRouter from "../src/routers/main-router";
import { RouterProvider } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <>
      <RouterProvider router={mainRouter} />
    </>
  );
}

export default App;
