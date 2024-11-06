import axios from 'axios';
const BASE_URL = 'http://localhost:3000'

async function getRooms(){
    const response = await axios.get(`${BASE_URL}/rooms`, {
        withCredentials:true
    })
    return response.data;
}

async function getRoomById(id){
    const response = await axios.get(`${BASE_URL}/rooms/${id}`)
    return response.data;
}


async function postRooms(room){
    try {
        const response = await axios.post(`${BASE_URL}/rooms`,{
            "room_name": room.name,
            "video_id": room.video_id, //나중에 수정 필요
            "room_password": room.password,
            "is_private": room.is_private
        })
        return response.data;
    } catch (error) {
        console.error(error)
        return {}
    }
}

export {getRooms, postRooms, getRoomById}