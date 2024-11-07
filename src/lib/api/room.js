import axios from 'axios';
const BASE_URL = 'http://localhost:3000';

async function getRooms(page = 1, room_name = '') {
  const response = await axios.get(`${BASE_URL}/rooms`, {
    params: { page, room_name }, // Send page and room_name as query parameters
  });
  return response.data;
}

async function getRoomById(id) {
  const response = await axios.get(`${BASE_URL}/rooms/${id}`);
  return response.data;
}

async function postRooms(room) {
  try {
    const response = await axios.post(`${BASE_URL}/rooms`, {
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
