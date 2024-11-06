import axios from 'axios';

const getVideos = async () => {
  const response = await axios.get('http://localhost:3000/video');
  return response.data;
};

const getVideoById = async () => {
  const response = await axios.get('http://localhost:3000/video/:id');
  return response.data;
};

const postVideo = async (url) => {
  try {
    const response = await axios.post('http://localhost:3000/video', { videoUrl: url });
    return response.data;
  } catch (error) {
    console.error(error);
    return {};
  }
};

export { getVideoById, getVideos, postVideo };
