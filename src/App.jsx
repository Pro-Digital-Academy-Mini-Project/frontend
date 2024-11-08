import mainRouter from '../src/routers/main-router';
import { RouterProvider } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer } from 'react-toastify';

import { AuthProvider } from './components/contexts/AuthContext';
function App() {
  return (
    <AuthProvider>
      <ToastContainer />
      <RouterProvider router={mainRouter} />
    </AuthProvider>
  );
}

export default App;
