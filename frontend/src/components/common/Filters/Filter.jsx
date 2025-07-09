import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "./Filter.css";

export default function Filter({ filters, setFilters, resetFilters }) {
  const [localFilters, setLocalFilters] = useState(filters || {});

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

    if (start_date && end_date && new Date(start_date) > new Date(end_date)) {
      toast.error("Start date cannot be after end date!");
      return;
    }

    setFilters({ ...localFilters });
  };

  const handleReset = () => {
    resetFilters();
  };

  return (
    <form className="filter-form" onSubmit={handleSubmit}>
      <div className="filter-row">
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
