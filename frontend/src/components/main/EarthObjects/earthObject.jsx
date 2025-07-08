import { useDispatch, useSelector } from "react-redux";
import Loader from "../../common/Loader/Loader";
import { FetchNeo } from "../../../redux/neo/action";
import { useEffect } from "react";
import "./EarthObject.css";

const EarthObject = () => {
  const dispatch = useDispatch();
  const { neo, loader } = useSelector((state) => state.neo);

  useEffect(() => {
    dispatch(FetchNeo());
  }, []);

  if (loader) return <Loader />;

  return (
    <div className="neo-wrapper">
      <h1 className="neo-title">☄️ Near Earth Objects</h1>
      {Object.entries(neo).map(([date, objects]) => (
        <div key={date} className="neo-date-section">
          <h2 className="neo-date">{date}</h2>
          <div className="neo-grid">
            {objects.map((item) => (
              <div key={item.id} className="neo-card">
                <h3 className="neo-name">{item.name}</h3>
                <p>
                  <strong>Hazardous:</strong>{" "}
                  {item.is_potentially_hazardous_asteroid ? "Yes 🚨" : "No ✅"}
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
      ))}
    </div>
  );
};

export default EarthObject;
