import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault(); // 기본 폼 제출 방지
    setError(''); // 이전 에러 초기화
    setSuccess(''); // 이전 성공 메시지 초기화

    try {
      const response = await axios.post(
        'http://localhost:3000/api/users/login',
        { email, password },
        {
          withCredentials: true,
        },
      );
      alert('로그인 완료'); // 알림 추가
      setSuccess('로그인 성공!'); // 성공 메시지 설정
      // console.log(response.data); // 로그인 후 필요한 데이터 처리
      localStorage.setItem('username', response.data.username);
      navigate('/'); // 홈 페이지로 리다이렉트
    } catch (err) {
      const errorMessage = err.response?.data?.message || '로그인 실패';
      setError(errorMessage); // 에러 메시지 설정
      console.error(errorMessage); // 에러 메시지 콘솔 출력
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto', padding: '20px' }}>
      <h2>로그인 페이지</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="email">이메일:</label>
          <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label htmlFor="password">비밀번호:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">로그인</button>
      </form>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {success && <div style={{ color: 'green' }}>{success}</div>}
    </div>
  );
}
