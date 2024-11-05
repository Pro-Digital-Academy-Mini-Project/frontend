import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import MainPage from '../components/MainPage/MainPage';
import LoginPage from '../components/LoginPage/LoginPage';
import SignUpPage from '../components/SignUpPage/SignUpPage';
import ChattingPage from '../components/ChattingPage/ChattingPage';
import RoomPage from '../components/RoomPage/RoomPage';


const router = createBrowserRouter([
  {
    path: '/',
    element: <MainPage />,
    index: true,
  },
  {
    path: '/login',
    element: <LoginPage />,
    index: true,
  },
  {
    path: '/signUp',
    element: <SignUpPage />,
    index: true,
  },
  {
    path: '/room/:id',
    element: <RoomPage />,
  },
  {
    path: '/chatting/:roomId',
    element: <ChattingPage />,
    index: true,
  }
]);
export default router;
