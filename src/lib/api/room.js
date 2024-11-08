import axios from 'axios';
import { BASE_URL } from './api.js';

async function getRooms(page = 1, room_name = '') {
  console.log('BASE_URL:', BASE_URL);
  console.log('Vite Environment Variables:', import.meta.env);
  const response = await axios.get(`${BASE_URL}/api/rooms`, {
    params: { page, room_name }, // Send page and room_name as query parameters
  });
  return response.data;
}

async function getRoomById(id) {
  console.log('BASE_URL:', BASE_URL);
  console.log('Vite Environment Variables:', import.meta.env);
  const response = await axios.get(`${BASE_URL}/api/rooms/${id}`);
  return response.data;
}

async function postRooms(room) {
  try {
    const response = await axios.post(`${BASE_URL}/api/rooms`, {
      room_name: room.name,
      video_url_id: room.video_url_id,
      owner_name: room.owner_name,
      room_password: room.password,
      is_private: room.is_private,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    return {};
  }
}

export { getRooms, postRooms, getRoomById };
