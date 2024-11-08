import axios from 'axios';
import { BASE_URL } from './api';

const getVideos = async () => {
  const response = await axios.get(`${BASE_URL}/api/video`);
  return response.data;
};

const getVideoById = async () => {
  const response = await axios.get(`${BASE_URL}/api/video/:id`);
  return response.data;
};

const postVideo = async (url) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/video`, { videoUrl: url });
    return response.data;
  } catch (error) {
    console.error(error);
    return {};
  }
};

export { getVideoById, getVideos, postVideo };
