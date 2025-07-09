import React, { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { FetchMarsRover } from "../../../redux/marsRover/action";
import Loader from "../../common/Loader/Loader";
import "./marsRover.css";
import { Container } from "react-bootstrap";
import Filter from "../../common/Filters/Filter";
import { resetFilters, setFilters } from "../../../redux/filters/action";
import NoDataFound from "../../common/NoDataFound/NoDataFound";
const MarsRover = () => {
  const dispatch = useDispatch();
  const { marsRover, loader } = useSelector((state) => state.mars);
  const componentKey = "marsRovers";
  const filters = useSelector(
    (state) => state.filters[componentKey] || {},
    shallowEqual
  );

  useEffect(() => {
    const queryParams = new URLSearchParams(
      Object.fromEntries(Object.entries(filters).filter(([_, value]) => value))
    );
    dispatch(FetchMarsRover(queryParams));
  }, [filters]);

  if (loader) return <Loader />;

  return (
    <div className="mars-wrapper">
      <Container>
        <h1 className="mars-title">🚀 Curiosity Mars Rover Imagery</h1>
        <Filter
          filterTypes={["camera", "date"]}
          filters={filters}
          setFilters={(f) => dispatch(setFilters(componentKey, f))}
          resetFilters={() => dispatch(resetFilters(componentKey))}
        />
        <div className="row">
          {marsRover.length > 0 ? (
            marsRover?.map((item) => (
              <div className="col-lg-4 col-sm-6 mb-4" key={item.id}>
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
                    <p className="mars-meta">
                      📅 Earth Date: {item.earth_date}
                    </p>
                    <p className="mars-meta">🔭 Sol: {item.sol}</p>
                    <p className="mars-meta">🛰️ Rover: {item.rover.name}</p>
                    <p className="mars-meta">
                      🟢 Status:{" "}
                      <span
                        style={{
                          color:
                            item.rover.status === "active"
                              ? "green"
                              : "darkred",
                          fontWeight: 600,
                        }}
                      >
                        {item.rover.status}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <NoDataFound />
          )}
        </div>
      </Container>
    </div>
  );
};

export default MarsRover;
