import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import "./NasaImageRing.css";
import { useDispatch, useSelector } from "react-redux";
import { FetchApod } from "../../../redux/apod/action";
import Loader from "../../common/Loader/Loader";

gsap.registerPlugin(Draggable);

const NasaImageRing = () => {
  const dispatch = useDispatch();
  const { apod, loader } = useSelector((state) => state.apod);
  const ringRef = useRef(null);
  const draggerRef = useRef(null);
  const imgRefs = useRef([]);
  const [focusedIndex, setFocusedIndex] = useState(0);
  const [imageList, setImageList] = useState([]);

  let xPos = 0;

  useEffect(() => {
    dispatch(FetchApod());
  }, []);

  useEffect(() => {
    if (!apod?.length) return;

    const images = apod
      .filter((item) => item.media_type === "image")
      .reverse()
      .slice(0, 10);

    setImageList(images);

    images.forEach((img, i) => {
      const el = imgRefs.current[i];
      if (el) {
        el.style.backgroundImage = `url(${img.url})`;
        el.style.backgroundSize = "cover";
        el.style.backgroundPosition = "center";
      }
    });

    gsap
      .timeline()
      .set(draggerRef.current, { opacity: 0 })
      .set(ringRef.current, { rotationY: 180 })
      .set(imgRefs.current, {
        rotateY: (i) => i * -36,
        transformOrigin: "50% 50% 700px",
        z: -700,
        backfaceVisibility: "hidden",
      })
      .from(imgRefs.current, {
        duration: 1.5,
        y: 200,
        opacity: 0,
        stagger: 0.1,
        ease: "expo",
      });

    Draggable.create(draggerRef.current, {
      onDragStart: (e) => {
        if (e.touches) e.clientX = e.touches[0].clientX;
        xPos = Math.round(e.clientX);
      },
      onDrag: (e) => {
        if (e.touches) e.clientX = e.touches[0].clientX;
        gsap.to(ringRef.current, {
          rotationY: "-=" + ((Math.round(e.clientX) - xPos) % 360),
        });
        xPos = Math.round(e.clientX);
        const rotation = gsap.getProperty(ringRef.current, "rotationY") % 360;
        const normalized = ((rotation % 360) + 360) % 360;
        const index = Math.round(normalized / 36) % 10;
        setFocusedIndex(index);
      },
      onDragEnd: () => {
        gsap.set(draggerRef.current, { x: 0, y: 0 });
      },
    });
  }, [apod]);

  if (loader) return <Loader />;

  return (
    <div className="nasa-wrapper">
      <h1 className="header mb-4">
        NASA POTD (Picture of the Day) for the Last 10 Days
      </h1>
      <div className="container">
        {imageList[focusedIndex] && (
          <div className="slider-main-img" style={{ textAlign: "center", marginTop: "30px" }}>
            <img
              src={imageList[focusedIndex].url}
              alt=""
              style={{
                // width: "90vw",
                // maxWidth: "1000px",
                // maxHeight: "80vh",
                objectFit: "fill",
                borderRadius: "12px",
                boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
              }}
            />
            <p style={{ marginTop: "10px", fontSize: "1.1rem" }}>
              {imageList[focusedIndex].title}
            </p>
          </div>
        )}
        <div id="ring" ref={ringRef}>
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className="img"
              ref={(el) => (imgRefs.current[i] = el)}
            ></div>
          ))}
        </div>
      </div>
      <div id="dragger" ref={draggerRef}></div>
    </div>
  );
};

export default NasaImageRing;
