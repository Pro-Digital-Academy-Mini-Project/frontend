import mainRouter from '../src/routers/main-router';
import { RouterProvider } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { AuthProvider } from './components/contexts/AuthContext';
function App() {
  return (
    <AuthProvider>
      <RouterProvider router={mainRouter} />
    </AuthProvider>
  );
}

export default App;
