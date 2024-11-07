import React, { createContext, useState, useEffect, useContext } from 'react';

// Context 생성
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUserName] = useState(() => localStorage.getItem('username'));


  
 

  const login = (username) => {
    // 로그인 처리 후 상태 업데이트
    setIsLoggedIn(true);
    localStorage.setItem('username', username);
    setUserName(username);
    alert('로그인 성공');
  };

  const logout = async () => {
    try {
      // 로그아웃 API 호출
      const response = await fetch('http://localhost:3000/users/logout', {
        method: 'POST',
        credentials: 'include', // 쿠키를 함께 보내기 위해 사용
      });
  
      if (response.ok) {
        // 로그아웃 성공 시 상태 업데이트
        setIsLoggedIn(false);
        localStorage.removeItem('username'); // username 제거
        setUserName("익명");
        alert("로그아웃 성공");
      } else {
        console.error('로그아웃 실패');
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