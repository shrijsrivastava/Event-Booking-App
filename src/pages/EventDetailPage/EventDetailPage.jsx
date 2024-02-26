import React, { useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { DataContext } from '../../context/dataContext';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import Footer from '../Footer/Footer';
import BurgerMenu from '../BurgerMenu/Burger';

const EventDetailPage = () => {
  let { selectedEvent, setSelectedEvent } = useContext(DataContext)
  const { eventId } = useParams();
  // const [eventDetails, setEventDetails] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/events/?id=${eventId}`);
        // setEventDetails(response.data);
        setSelectedEvent(response.data[0]);
      } catch (error) {
        console.error('Error fetching event details:', error);
      }
    };

    fetchData();
  }, [eventId, setSelectedEvent]);

  if (!selectedEvent) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <BurgerMenu />
      {/* {console.log(selectedEvent)} */}
      {/* {console.log(eventId)} */}
      <div className="container mt-5 mb-5">
        <div className="card pt-5 pb-5" >
          <div className="row no-gutters">
            <div className="col-md-4">
              <img
                src={selectedEvent.imageUrl}
                className="card-img"
                alt="Event"
                style={{ marginLeft: '50px', marginTop: '40px' }}
              />
            </div>
            <div className="col-md-8">
              <div className="card-body mt-3 mb-3">
                <h2 className="card-title mb-3">{selectedEvent.title}</h2>
                <h4 className="card-title mb-3">{selectedEvent.venue}</h4>
                <p className="card-text mb-3">{selectedEvent.date}</p>
                <p className="card-text mt-3 mb-3">{selectedEvent.priceInRupees}</p>
                <button className="btn btn-primary  mt -3 mb-3"><Link to={`/Payment/${selectedEvent.id}`} className='link-style'>Book Now</Link></button>
                <p className="card-text mt-3">{selectedEvent.description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default EventDetailPage;
