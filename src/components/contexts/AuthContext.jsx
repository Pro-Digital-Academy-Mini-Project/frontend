import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';
import { BASE_URL } from '../../lib/api/api';
import { toast } from 'react-toastify';

// Context 생성
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUserName] = useState(() => localStorage.getItem('username'));

  // component가 마운트되었을때 한 번,
  // localStorage에서 username을 조회하여 값이 있으면 username state업데이트 , login 상태도 true로

  useEffect(() => {
    if (username && username !== '익명') {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [username]);

  // useEffect(func, 배열): 배열에 있는 값이 변화할 때 마다 func 실행 (배열이 비어있으면 컴포넌트 마운트시 한 번)
  // const callbackFunc = useCallback(func, 배열): 배열에 있는 값이 변화할 때 마다, func을 재정의 (배열이 비어있으면 컴포넌트 마운트시 한 번)
  // const momoValue = useMemo(func, 배열) = useMemo(func, 배열): 배열에 있는 값이 변화할 때 마다, func을 실행하여 return값을 memoValue에 저장.

  const login = (username) => {
    // 로그인 처리 후 상태 업데이트
    setIsLoggedIn(true);
    localStorage.setItem('username', username);
    setUserName(username);
    toast('성공적으로 로그인되었습니다!');
  };

  const logout = async () => {
    try {
      // 로그아웃 API 호출
      const response = await fetch(`${BASE_URL}/api/users/logout`, {
        method: 'POST',
        credentials: 'include', // 쿠키를 함께 보내기 위해 사용
      });

      if (response.ok) {
        // 로그아웃 성공 시 상태 업데이트
        setIsLoggedIn(false);
        localStorage.removeItem('username'); // username 제거
        setUserName('익명');
        toast('로그아웃되었습니다');
      } else {
        console.error('로그아웃에 실패했습니다');
      }
    } catch (error) {
      console.error('로그아웃 중 오류 발생:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, username, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// 커스텀 훅
export const useAuth = () => useContext(AuthContext);

export { AuthProvider };
