import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FetchEpic } from "../../../redux/epic/action";
import Loader from "../../common/Loader/Loader";
import "./EarthPolychromatic.css";

const EarthPolychromatic = () => {
  const dispatch = useDispatch();
  const { epic, loader } = useSelector((state) => state.epic);

  useEffect(() => {
    dispatch(FetchEpic());
  }, []);

  if (loader) return <Loader />;

  return (
    <div className="epic-wrapper">
      <h1 className="epic-title">🌍 Earth Polychromatic Imagery</h1>
      <div className="epic-grid">
        {epic?.map((item) => (
          <div className="epic-card" key={item.identifier}>
            <img
              className="epic-image"
              src={item.imageUrl}
              alt={item.caption}
            />
            <div className="epic-info">
              <h3 className="epic-caption">{item.caption}</h3>
              <p className="epic-date">📅 {item.date}</p>
              <p className="epic-coords">
                🌐 Lat: {item.centroid_coordinates?.lat}, Lon:{" "}
                {item.centroid_coordinates?.lon}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EarthPolychromatic;
