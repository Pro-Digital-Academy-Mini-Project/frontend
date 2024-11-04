import { useState } from 'react'
import mainRouter from '../src/routers/main-router';
import { RouterProvider } from 'react-router-dom';
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <RouterProvider router={mainRouter} />
    </>
  )
}

export default App
