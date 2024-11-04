import mainRouter from '../src/routers/main-router';
import { RouterProvider } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  return (
    <>
      <RouterProvider router={mainRouter} />
    </>
  )
}

export default App
