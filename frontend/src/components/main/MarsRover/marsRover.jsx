import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FetchMarsRover } from "../../../redux/marsRover/action";
import Loader from "../../common/Loader/Loader";
import "./marsRover.css";
import { Col, Container, Row } from "react-bootstrap";
const MarsRover = () => {
  const dispatch = useDispatch();
  const { marsRover, loader } = useSelector((state) => state.mars);

  useEffect(() => {
    dispatch(FetchMarsRover());
  }, []);

  if (loader) return <Loader />;

  return (
    <div className="mars-wrapper">
      <Container>
      <h1 className="mars-title">🚀 Mars Rover Imagery</h1>
      {/* <Row>
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
      </Row> */}
        <div className="row">
            {marsRover?.map((item) => (
              <div className="col-lg-4 col-sm-6 mb-md-0 mb-4" key={item.id}>
                <div className="mars-card">
                  <div className="mars-card-img">
                  <img
                    className="mars-image img-fluid"
                    src={item.img_src}
                    alt={item.camera.full_name}
                  />
                  </div>
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
              </div>
            ))}
          </div>
     </Container>
    </div>
  );
};

export default MarsRover;
