import { useState, useEffect, useMemo } from "react";
import { toast } from "react-toastify";
import "./Filter.css";

export default function Filter({
  filterTypes = [],
  filters,
  setFilters,
  resetFilters,
}) {
  const [localFilters, setLocalFilters] = useState(filters || {});
  const filterSet = useMemo(() => new Set(filterTypes), [filterTypes]);

  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { start_date, end_date } = localFilters;

    if (!start_date && end_date) {
      toast.error("Please provide a start date as well!");
      return;
    }

    if (start_date && end_date && new Date(start_date) > new Date(end_date)) {
      toast.error("Start date cannot be after end date!");
      return;
    }

    setFilters({ ...localFilters });
  };

  const handleReset = () => {
    resetFilters();
  };

  const cameraOptions = [
    { value: "FHAZ_LEFT_B", label: "Front Hazard Avoidance Camera" },
    { value: "RHAZ_LEFT_B", label: "Rear Hazard Avoidance Camera" },
    { value: "CHEMCAM_RMI", label: "Chemistry and Camera Complex" },
    { value: "MAHLI", label: "Mars Hand Lens Imager" },
    { value: "MARDI", label: "Mars Descent Imager" },
    { value: "NAV_RIGHT_B", label: "Navigation Camera" },
  ];

  return (
    <form className="filter-form" onSubmit={handleSubmit}>
      <div className="filter-row">
        {filterSet.has("start_date") && (
          <div className="filter-group">
            <label htmlFor="start_date">Start Date</label>
            <input
              type="date"
              name="start_date"
              id="start_date"
              value={localFilters.start_date || ""}
              onChange={handleChange}
            />
          </div>
        )}

        {filterSet.has("end_date") && (
          <div className="filter-group">
            <label htmlFor="end_date">End Date</label>
            <input
              type="date"
              name="end_date"
              id="end_date"
              value={localFilters.end_date || ""}
              onChange={handleChange}
            />
          </div>
        )}

        {filterSet.has("camera") && (
          <div className="filter-group">
            <label htmlFor="camera">Camera</label>
            <select
              name="camera"
              id="camera"
              value={localFilters.camera || ""}
              onChange={handleChange}
            >
              <option value="">Select Camera</option>
              {cameraOptions.map((cam) => (
                <option key={cam.value} value={cam.value}>
                  {cam.label}
                </option>
              ))}
            </select>
          </div>
        )}

        {filterSet.has("date") && (
          <div className="filter-group">
            <label htmlFor="date">Date</label>
            <input
              type="date"
              name="date"
              id="date"
              value={localFilters.date || ""}
              onChange={handleChange}
            />
          </div>
        )}

        {filterSet.has("type") && (
          <div className="filter-group">
            <label htmlFor="type">Type</label>
            <select
              name="type"
              id="type"
              value={localFilters.type || ""}
              onChange={handleChange}
            >
              <option value="">Select Type</option>
              <option value="natural">Natural</option>
              <option value="enhanced">Enhanced</option>
            </select>
          </div>
        )}

        <div className="filter-buttons">
          <button type="submit" className="filter-btn apply-btn">
            Apply Filters
          </button>
          <button
            type="button"
            className="filter-btn reset-btn"
            onClick={handleReset}
          >
            Reset
          </button>
        </div>
      </div>
    </form>
  );
}
