export const IMG_URL = import.meta.env.VITE_PUBLIC_URL
  ? `${import.meta.env.VITE_PUBLIC_URL}/img` // 이미지 경로를 가리키도록 수정
  : 'http://localhost:3000/img'; // 기본값 수정
