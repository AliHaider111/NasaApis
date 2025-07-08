import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FetchApod } from '../../../redux/apod/action';
import Loader from '../../common/Loader/Loader';

const Home = () => {
  const dispatch = useDispatch();
  const { apod } = useSelector((state) => state.apod);
  const today = new Date().toISOString().split('T')[0];
  const [date, setDate] = useState(today);

  // Fetch the APOD data whenever the date changes
  useEffect(() => {
    if (date) {
      dispatch(FetchApod(date));
    }
  }, [date, dispatch]);


/**
 * Updates the date state when the date input changes.
 * 
 * @param {Object} event - The event object from the date input change.
 */
  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  return (
    <div className="apod-container">
      <h1>🚀 NASA Astronomy Picture of the Day</h1>

      <div className="date-picker">
        <input
          type="date"
          value={date}
          onChange={handleDateChange}
          max={today}
        />
      </div>

      {apod ? (
        <div className="apod-card">
          <h2>{apod.title}</h2>
          <p>{apod.date}</p>

          {apod.media_type === 'image' ? (
            <img src={apod.url} alt={apod.title} className="apod-image" />
          ) : (
            <iframe
              src={apod.url}
              title="NASA Video"
              width="100%"
              height="400"
              frameBorder="0"
              allow="fullscreen"
              className="apod-video"
            />
          )}

          <p className="apod-description">{apod.explanation}</p>
        </div>
      ) : (
        <Loader/>
      )}
    </div>
  );
};

export default Home;
