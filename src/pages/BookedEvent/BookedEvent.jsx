import { useContext, useState, useEffect } from 'react';
import { DataContext } from '../../context/dataContext';
import axios from 'axios';
import Footer from '../Footer/Footer';
import BurgerMenu from '../BurgerMenu/Burger';

function BookedEvent() {
  const { user } = useContext(DataContext);
  const [boookedEvents, setBookedEvents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/bookevents/?email=${user.email}`);
        setBookedEvents(response.data);
      } catch (error) {
        console.error('Error fetching event details:', error);
      }
    };

    fetchData();
  }, [user.email]);

  return (
    <div>
      <BurgerMenu />
      <div className="container mt-5 mb-5">
        <div className="row">
          {boookedEvents.map((book) => (
            <div key={book.id} className="col-lg-2 col-md-4 mb-4">
              <div className="card">
                <div className="card-body">
                  <h4 className="card-title text-white">Event: {book.title}</h4>
                  <p className="card-text text-white">Your Venue: {book.venue}</p>
                  <p className="card-text text-white">Date: {book.date}</p>
                  <p className="card-text text-white">No of Tickets: {book.tickets}</p>
                  <p className="card-text text-white">Cost: {book.cost}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default BookedEvent;
