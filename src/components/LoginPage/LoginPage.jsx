import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { BASE_URL } from '../../lib/api/api.js';
import { IMG_URL } from '../../lib/img';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault(); // 기본 폼 제출 방지
    setError(''); // 이전 에러 초기화
    setSuccess(''); // 이전 성공 메시지 초기화

    try {
      const response = await axios.post(
        `${BASE_URL}/api/users/login`,
        { email, password },
        {
          withCredentials: true,
        },
      );
      // setSuccess('로그인 성공!'); // 성공 메시지 설정
      // console.log(response.data); // 로그인 후 필요한 데이터 처리
      // localStorage.setItem("username",response.data.username)
      login(response.data.username);
      navigate('/'); // 홈 페이지로 리다이렉트
    } catch (err) {
      const errorMessage = err.response?.data?.message || '로그인에 실패했습니다...';
      setError(errorMessage); // 에러 메시지 설정
      console.error(errorMessage); // 에러 메시지 콘솔 출력
    }
  };

  return (
    <div>
      <div className="absolute inset-0 h-screen flex flex-col bg-black bg-opacity-50 text-white overflow-hidden">
        <div
          className="flex-1 flex items-center justify-center  relative bg-cover bg-center"
          style={{
            backgroundImage: `url("/img/bg-youtube.jpg")`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
          }}
        >
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="md:w-1/2 max-w-xl z-10 text-white mx-auto bg-black p-10 rounded-xl opacity-85">
            <div className="w-full max-w-xl shadow-lg space-y-10 mx-auto">
              <div className="text-left">
                <h2 className="text-3xl font-semibold text-white">로그인</h2>
                <p className="py-3">Wetube에서 함께 볼 때 더 즐거운 순간들</p>
              </div>

              <form onSubmit={handleLogin} className="space-y-10">
                <div className="space-y-3">
                  <div>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      placeholder="이메일을 입력해주세요"
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 bg-black rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-500"
                      required
                    />
                  </div>

                  <div>
                    <input
                      type="password"
                      id="password"
                      placeholder="비밀번호를 입력해주세요"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-4 py-3 bg-black rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-500"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-medium transition-colors shadow-lg"
                >
                  로그인
                </button>

                {error && <div className="text-red-500 text-center mt-4">{error}</div>}
                {success && <div className="text-green-500 text-center mt-4">{success}</div>}
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* <div style={{ maxWidth: '400px', margin: 'auto', padding: '20px' }}>
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
      </div> */}
    </div>
  );
}
