import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
// import {useContext } from 'react';
// import {DataContext} from '../../context/dataContext';
import axios from 'axios';
import './Events.css';

const Events = () => {
  // let {user, setUser} = useContext(DataContext)
  const [eventsData, setEventsData] = useState([]);
  const [uniqueCategories, setUniqueCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:4000/events");
        setEventsData(response.data);
        setUniqueCategories([...new Set(response.data.map((event) => event.category))]);
      } catch (error) {
        alert.error('Error fetching events data:', error);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures that the effect runs only once after the initial render

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const handleShowAllClick = () => {
    setSelectedCategory(null);
  };

  const filteredEvents = selectedCategory
    ? eventsData
      .filter((event) => event.category === selectedCategory)
      .sort((a, b) => new Date(a.date) - new Date(b.date))
    : eventsData.sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <div className="container mt-4">
      {console.log(eventsData)}
      <h2 className="text-center mb-5">Categories</h2>
      <div className="row">
        {uniqueCategories.map((category) => (
          <div key={category} className="col-lg-2 col-md-4 mb-4">
            <div
              className={`card h-100 ${selectedCategory === category ? 'selected-category' : ''}`}
              onClick={() => handleCategoryClick(category)}
            >
              <div className="card-body">
                <h6 className="card-subtitle mb-2 mt-2 text-white">{category}</h6>
              </div>
            </div>
          </div>
        ))}
        {/* Show All card */}
        <div className="col-lg-2 col-md-4 mb-4">
          <div className={`card h-100 ${selectedCategory === null ? 'selected-category' : ''}`} onClick={handleShowAllClick}>
            <div className="card-body">
              <h6 className="card-subtitle mb-2 mt-2 text-white">Show All</h6>
            </div>
          </div>
        </div>
      </div>

      <h2 className="mt-4 mb-5 text-center">All Events</h2>
      <div className="row">
        {filteredEvents.map((event) => (
          <div key={event.id} className="col-lg-2 col-md-4 mb-4">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title text-white">{event.title}</h5>
                <h6 className="card-subtitle mb-2 ">{event.category}</h6>
                <p className="card-text text-white">{event.venue}</p>
                <p className="card-text text-white">{event.date}</p>
                <p className="card-text text-white">{event.description}</p>
                <Link to={`/EventsDetailPage/${event.id}`} className="card-link">
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Events;
