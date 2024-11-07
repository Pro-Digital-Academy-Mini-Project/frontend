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
    <YouTube
      videoId={video_id}
      onReady={onReady}
      opts={{
        height: '360',
        width: '640',
        playerVars: {
          autoplay: 0,
        },
        host: 'https://www.youtube-nocookie.com',
      }}
    />
  );
}
