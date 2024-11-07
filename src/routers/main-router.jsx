import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import MainPage from '../components/MainPage/MainPage';
import LoginPage from '../components/LoginPage/LoginPage';
import SignUpPage from '../components/SignUpPage/SignUpPage';
import ChattingPage from '../components/ChattingPage/ChattingPage';
import BoardLayout from '../routes/detail/layout';
import RoomPage from '../components/RoomPage/RoomPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <BoardLayout />,
    children: [
      { path: '/', element: <MainPage /> }, // index: true를 제거하고 path: '/'로 설정
      { path: 'signup', element: <SignUpPage /> },
      { path: 'login', element: <LoginPage /> },
    ],
  },
  {
    path: 'room/:roomId',
    element: <RoomPage />,
  },
  {
    path: 'chatting/:roomId',
    element: <ChattingPage />,
    index: true,
  },
]);

export default router;
