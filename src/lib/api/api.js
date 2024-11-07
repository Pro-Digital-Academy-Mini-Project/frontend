export const BASE_URL = import.meta.env.VITE_BACK_URL
  ? `${import.meta.env.VITE_BACK_URL}/api`
  : 'http://localhost:3000/api';
