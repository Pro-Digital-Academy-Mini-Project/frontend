import React from 'react';
import { useState } from 'react';
import MessageInput from './MessageInput';

export default function TotalChat({ roomId }) {
  const [messages, setMessages] = useState([]);

  //초기 전체 댓글 로드
  useEffect(() => {
    const fetchTotalComments = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/Comment/${roomId}`);
        console.log(response.data);
        // 시간 순으로 정렬
        const sortedComments = response.data.sort((a, b) => a.timestamp - b.timestamp);
        setMessages(sortedComments);
      } catch (error) {
        console.error('타임라인 댓글 로드 실패:', error);
      }
    };
    fetchTotalComments();
  }, [roomId]);

  //다른 사용자가 보낸 메시지 받기
  useEffect(() => {
    socket.on('receiveTotalMessage', (data) => {
      setMessages((prevMessages) => {
        return [
          ...prevMessages,
          {
            username: data.username,
            room_id: data.roomId,
            content: data.content,
            created_at: data.created_at,
          },
        ];
      });
    });
  }, [roomId]);

  return (
    <div>
      <div
        style={{
          border: '1px solid #ccc',
          height: '300px',
          overflowY: 'scroll',
        }}
      >
        {messages !== null ? messages.map((msg, index) => <div key={index}>{msg}</div>) : null}
      </div>
      <MessageInput roomId={roomId} />
    </div>
  );
}
