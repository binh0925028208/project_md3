import React from "react";
import "./homeVideo.css";
const HomeVideo = () => {
  return (
    <section className="video">
      <div className="video_box">
        <div className="video_box_text">
          <h4>New to this ?</h4>
          <p>
            This hobby need to learn several things first, for your own safety,
            watch these video.
          </p>
        </div>
        <iframe
          width={400}
          height={300}
          src="https://www.youtube.com/embed/56sV0DPVBYo"
          title="Beginner Gunpla Tool Kit ESSENTIALS"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        />
        <iframe
          width={400}
          height={300}
          src="https://www.youtube.com/embed/xMxiXU0RCuM"
          title="Best Model Kits for Beginners | Top Five Kits to Get Started"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        />
      </div>
    </section>
  );
};

export default HomeVideo;
