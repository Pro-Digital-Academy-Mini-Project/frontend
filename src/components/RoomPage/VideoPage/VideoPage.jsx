import React, { useRef } from 'react';
import YouTube from 'react-youtube';

export default function VideoPage(video_id) {
  const playerRef = useRef(null);

  const onReady = (event) => {
    playerRef.current = event.target; // YouTube 플레이어 인스턴스를 저장
  };

  const getCurrentTime = () => {
    if (playerRef.current) {
      const currentTime = playerRef.current.getCurrentTime();
      console.log('Current Time:', currentTime);
      return currentTime;
    }
    return null;
  };
  return (
    <div>
      <YouTube
        videoId={video_id.video_id}
        onReady={onReady} // 플레이어가 준비되면 호출
        opts={{
          height: '360',
          width: '640',
          playerVars: {
            autoplay: 0,
          },
          host: 'https://www.youtube-nocookie.com', // nocookie 도메인 사용
        }}
      />
    </div>
  );
}
