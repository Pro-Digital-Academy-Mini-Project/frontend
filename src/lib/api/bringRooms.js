import axios from 'axios';

async function getRooms(){
    const response = await axios.get('http://localhost:3000/rooms/video')
    return response.data;
}

export {getRooms}