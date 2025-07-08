import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FetchMarsRover } from "../../../redux/marsRover/action";
import Loader from "../../common/Loader/Loader";
import "./marsRover.css";
const MarsRover = () => {
  const dispatch = useDispatch();
  const { marsRover, loader } = useSelector((state) => state.mars);

  useEffect(() => {
    dispatch(FetchMarsRover());
  }, []);

  if (loader) return <Loader />;

  return (
    <div className="mars-wrapper">
      <h1 className="mars-title">🚀 Mars Rover Imagery</h1>
      <div className="mars-grid">
        {marsRover?.map((item) => (
          <div className="mars-card" key={item.id}>
            <img
              className="mars-image"
              src={item.img_src}
              alt={item.camera.full_name}
            />
            <div className="mars-info">
              <h3 className="mars-caption">{item.camera.full_name}</h3>
              <p className="mars-meta">📅 Earth Date: {item.earth_date}</p>
              <p className="mars-meta">🔭 Sol: {item.sol}</p>
              <p className="mars-meta">🛰️ Rover: {item.rover.name}</p>
              <p className="mars-meta">
                🟢 Status:{" "}
                <span
                  style={{
                    color: item.rover.status === "active" ? "green" : "darkred",
                    fontWeight: 600,
                  }}
                >
                  {item.rover.status}
                </span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MarsRover;
