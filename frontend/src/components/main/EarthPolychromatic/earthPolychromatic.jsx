import { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { FetchEpic } from "../../../redux/epic/action";
import Loader from "../../common/Loader/Loader";
import "./EarthPolychromatic.css";
import Filter from "../../common/Filters/Filter";
import { resetFilters, setFilters } from "../../../redux/filters/action";
import { Container } from "react-bootstrap";
import NoDataFound from "../../common/NoDataFound/NoDataFound";

const EarthPolychromatic = () => {
  const dispatch = useDispatch();
  const { epic, loader } = useSelector((state) => state.epic);
  const componentKey = "earthpolychromatic";
  const filters = useSelector(
    (state) => state.filters[componentKey] || {},
    shallowEqual
  );

  useEffect(() => {
    const queryParams = new URLSearchParams(
      Object.fromEntries(Object.entries(filters).filter(([_, value]) => value))
    );
    dispatch(FetchEpic(queryParams));
  }, [filters]);

  if (loader) return <Loader />;

  return (
    <div className="epic-wrapper">
      <Container>
        <h1 className="epic-title">🌍 Earth Polychromatic Imagery</h1>
        <Filter
          filterTypes={["type", "date"]}
          filters={filters}
          setFilters={(f) => dispatch(setFilters(componentKey, f))}
          resetFilters={() => dispatch(resetFilters(componentKey))}
        />
        <div className="epic-grid">
          {epic?.length > 1 ? (
            epic?.map((item) => (
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
            ))
          ) : (
            <NoDataFound />
          )}
        </div>
      </Container>
    </div>
  );
};

export default EarthPolychromatic;
