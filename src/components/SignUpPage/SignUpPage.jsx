import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function SignUpPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault(); // 기본 폼 제출 방지
    setError(''); // 이전 에러 초기화
    setSuccess(''); // 이전 성공 메시지 초기화

    try {
      // 서버에 회원가입 요청
      const response = await axios.post('http://localhost:3000/users/signup', { username, email, password });

      // 회원가입 성공 시
      setSuccess('회원가입 성공!'); // 성공 메시지 설정
      alert('회원가입이 완료되었습니다!'); // 알림 추가

      // 예: 로그인 페이지로 리다이렉트
      navigate('/login'); // 로그인 페이지로 리다이렉트
    } catch (err) {
      const errorMessage = err.response?.data?.message || '회원가입 실패';
      setError(errorMessage); // 에러 메시지 설정
      console.error(errorMessage); // 에러 메시지 콘솔 출력
    }
  };

  return (
    <div className="absolute inset-0 h-screen flex flex-col bg-black bg-opacity-90 text-white overflow-hidden">
      <div
        className="flex-1 flex items-center justify-center  relative bg-cover bg-center"
        style={{
          backgroundImage: 'url("../../../public/img/youtube-bg.jpg")',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="md:w-1/2 max-w-xl z-10 text-white mx-auto bg-black p-10 rounded-xl opacity-85">
          <div className="w-full max-w-xl shadow-lg space-y-10 mx-auto">
            <div className="text-left">
              <h2 className="text-3xl font-semibold text-white">회원가입</h2>
              <p className="py-3">Wetube에 오신 것을 환영합니다</p>
            </div>

            <form onSubmit={handleSignUp} className="space-y-10">
              <div className="space-y-3">
                <div>
                  <input
                    id="username"
                    value={username}
                    placeholder="닉네임을 입력해주세요"
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-lg border bg-black border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-500"
                  />
                </div>
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
                회원가입
              </button>

              {error && <div className="text-red-500 text-center mt-4">{error}</div>}
              {success && <div className="text-green-500 text-center mt-4">{success}</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
