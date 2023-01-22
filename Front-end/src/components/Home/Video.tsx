import video from '/videos/video.mp4';

export default function Video() {
  return (
    <div className="justify-content-center d-flex mb-3 mt-4">
      <iframe
        src={video}
        title="YouTube video"
        allowFullScreen
      ></iframe>
    </div>
  );
}