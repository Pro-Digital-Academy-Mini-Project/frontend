import React, { useRef, useEffect } from 'react';
import YouTube from 'react-youtube';

export default function VideoPage({ video_id, updateCurrentTime }) {
  const playerRef = useRef(null);

  const onReady = (event) => {
    playerRef.current = event.target;
  };

  const getCurrentTime = () => {
    if (playerRef.current) {
      const currentTime = playerRef.current.getCurrentTime();
      updateCurrentTime(currentTime);
      return currentTime;
    }
    return null;
  };

  const seekToTime = (time) => {
    if (playerRef.current) {
      playerRef.current.seekTo(time, true);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      getCurrentTime();
    }, 100);
    console.log('video_id ', video_id);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full flex items-center justify-center bg-black">
      <div className="w-full h-0 pb-[56.25%] relative">
        <YouTube
          videoId={video_id}
          onReady={onReady} // 플레이어가 준비되면 호출
          opts={{
            width: '100%',
            height: '100%',
            playerVars: {
              autoplay: 0,
            },
            host: 'https://www.youtube-nocookie.com', // nocookie 도메인 사용
          }}
          className="absolute top-0 left-0 w-full h-full"
        />
      </div>
    </div>
  );
}
