import React from 'react';
import video from '../assets/videos/video.mp4';

export default function Video() {
  return (
    <div className="ratio ratio-16x9 mb-3 mt-4">
      <iframe
        src={video}
        title="YouTube video"
        allowFullScreen
      ></iframe>
    </div>
  );
}