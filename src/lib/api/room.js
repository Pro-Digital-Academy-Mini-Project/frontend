import axios from 'axios';

async function getRooms(){
    const response = await axios.get('http://localhost:3000/rooms/video')
    return response.data;
}

async function postRooms(room){
    try {
        const response = await axios.post('http://localhost:3000/rooms',{
            "room_name": room.name,
            "video_id": "67286dd8dabe0f04edd2b5f3", //나중에 수정 필요
            "room_password": room.password,
            "is_private": room.is_private
        })
        return response.data;
    } catch (error) {
        console.error(error)
        return {}
    }
}

export {getRooms, postRooms}