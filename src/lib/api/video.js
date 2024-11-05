import axios from 'axios';
const BASE_URL = 'http://localhost:3000'

async function postVideo(id){
    try {
        const response = await axios.post(`${BASE_URL}/videos`,{
            "video_id": id, 
        })
        return response.data;
    } catch (error) {
        console.error(error)
        return {}
    }
}

export {postVideo}