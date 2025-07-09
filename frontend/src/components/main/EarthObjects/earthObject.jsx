import { shallowEqual, useDispatch, useSelector } from "react-redux";
import Loader from "../../common/Loader/Loader";
import { FetchNeo } from "../../../redux/neo/action";
import { useEffect } from "react";
import "./EarthObject.css";
import Filter from "../../common/Filters/Filter";
import { resetFilters, setFilters } from "../../../redux/filters/action";
import { Container } from "react-bootstrap";
import NoDataFound from "../../common/NoDataFound/NoDataFound";

const EarthObject = () => {
  const dispatch = useDispatch();
  const { neo, loader } = useSelector((state) => state.neo);
  const componentKey = "neo";
  const filters = useSelector(
    (state) => state.filters[componentKey] || {},
    shallowEqual
  );

  useEffect(() => {
    const queryParams = new URLSearchParams(
      Object.fromEntries(Object.entries(filters).filter(([_, value]) => value))
    );
    dispatch(FetchNeo(queryParams));
  }, [filters]);

  if (loader) return <Loader />;

  return (
    <div className="neo-wrapper">
      <Container>
        <h1 className="neo-title">☄️ Near Earth Objects</h1>
        <Filter
          filterTypes={["start_date", "end_date"]}
          filters={filters}
          setFilters={(f) => dispatch(setFilters(componentKey, f))}
          resetFilters={() => dispatch(resetFilters(componentKey))}
        />
        {neo?.near_earth_objects &&
        Object.keys(neo.near_earth_objects).length > 0 ? (
          Object.entries(neo.near_earth_objects)
            .sort(([dateA], [dateB]) => new Date(dateA) - new Date(dateB))
            .map(([date, objects]) => (
              <div key={date} className="neo-date-section">
                <h2 className="neo-date">{date}</h2>
                <div className="neo-grid">
                  {(Array.isArray(objects) ? objects : []).map((item) => (
                    <div key={item.id} className="neo-card">
                      <h3 className="neo-name">{item.name}</h3>
                      <p>
                        <strong>Hazardous:</strong>{" "}
                        {item.is_potentially_hazardous_asteroid
                          ? "Yes 🚨"
                          : "No ✅"}
                      </p>
                      <p>
                        <strong>Magnitude:</strong> {item.absolute_magnitude_h}
                      </p>
                      <p>
                        <strong>Diameter:</strong>{" "}
                        {item.estimated_diameter.kilometers.estimated_diameter_min.toFixed(
                          2
                        )}{" "}
                        -{" "}
                        {item.estimated_diameter.kilometers.estimated_diameter_max.toFixed(
                          2
                        )}{" "}
                        km
                      </p>
                      <a
                        href={item.nasa_jpl_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="neo-button"
                      >
                        More Info
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            ))
        ) : (
          <NoDataFound />
        )}
      </Container>
    </div>
  );
};

export default EarthObject;
