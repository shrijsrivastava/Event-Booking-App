import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useContext } from 'react';
import { DataContext } from '../../context/dataContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import './PaymentPage.css';
import Footer from '../Footer/Footer';
import BurgerMenu from '../BurgerMenu/Burger';
import { useNavigate } from 'react-router-dom';

const PaymentPage = () => {
  let {user, selectedEvent ,bookevent, setbookevent} = useContext(DataContext)
  const [price, setPrice] = useState(selectedEvent.priceInRupees);
  const [count, setCount] = useState(1);
  let navigate = useNavigate();
  // const { eventId } = useParams();
  // const [eventDetail, setEventDetails] = useState(null);
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get(`http://localhost:4000/events/${eventId}`);
  //       setEventDetails(response.data);
  //       console.log(response.data)
  //       setPrice(eventDetail.priceInRupees)
  //     } catch (error) {
  //       console.error('Error fetching event details:', error);
  //     }
  //   };
  //   fetchData();
  // }, [eventDetail.priceInRupees, eventId]);
  useEffect(() => {
    setbookevent({
      email: user.email,
      title: selectedEvent.title,
      date: selectedEvent.date,
      venue: selectedEvent.venue,
      tickets: count,
      cost: price
    });
  }, [user.email, selectedEvent.title, selectedEvent.date, selectedEvent.venue, count, price,setbookevent]);
  

  const [formData, setFormData] = useState({
    name: user.fullName || '',
    email: user.email || '',
    phone: '',
    cardHolder: '',
    cardNumber: '',
    expDate: '',
    cvc: '',
  });

  const [validationErrors, setValidationErrors] = useState({
    name: '',
    email: '',
    phone: '',
    cardHolder: '',
    cardNumber: '',
    expDate: '',
    cvc: '',
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    setValidationErrors({ ...validationErrors, [e.target.id]: '' });
  };

  const subprice = () => {
    if (count > 1) {
      setPrice(price - selectedEvent.priceInRupees);
      setCount(count-1)
    }
    else {
      alert('Item count cannot be 0')
    }
  }
  const addprice = () => {
    setPrice(price + selectedEvent.priceInRupees);
    setCount(count+1);
  }

  const handleMakePayment = (e) => {
    e.preventDefault();

    const errors = {};

    // Basic form validation
    if (formData.name.trim() === '') {
      errors.name = 'Name is required.';
    }

    if (formData.email.trim() === '') {
      errors.email = 'Email is required.';
    }

    if (formData.phone.trim() === '') {
      errors.phone = 'Phone number is required.';
    }

    if (formData.cardHolder.trim() === '') {
      errors.cardHolder = 'Cardholder name is required.';
    }

    if (formData.cardNumber.trim() === '') {
      errors.cardNumber = 'Card number is required.';
    }

    if (formData.expDate.trim() === '') {
      errors.expDate = 'Expiration date is required.';
    }

    if (formData.cvc.trim() === '' || formData.cvc.length !== 3) {
      errors.cvc = 'CVC is invalid.';
    }
    
    // Check if there are any validation errors
    if (Object.keys(errors).length === 0) {
      axios.post("http://localhost:4000/bookevents", bookevent)
      .then((res) => {
        console.log(res);
        alert('Payment successful!');
        setValidationErrors({});
        navigate('/HomePage');
      })
      .catch((error) => {
        console.error('Error during registration:', error);
      });
    } else {
      setValidationErrors(errors);
    }
  };

  return (
    <div>
      <BurgerMenu />
      <div className="container mt-4 mb-5">
        <h2 className="text-center mt-3 mb-5">Payment Information</h2>

        <div className="row">
          {/* Card 1: Personal Information */}
          <div className="col-md-4 mb-4">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">Personal Information</h5>
                <form>
                  <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                      type="text"
                      className={`form-control ${validationErrors.name && 'is-invalid'}`}
                      id="name"
                      placeholder="Enter your name"
                      onChange={handleInputChange}
                      value={formData.name}
                      // autoComplete={formData.fullName}
                    />
                    {validationErrors.name && (
                      <div className="invalid-feedback">{validationErrors.name}</div>
                    )}
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      className={`form-control ${validationErrors.email && 'is-invalid'}`}
                      id="email"
                      placeholder="Enter your email"
                      onChange={handleInputChange}
                      value={formData.email}
                      // autoComplete={formData.email}
                    />
                    {validationErrors.email && (
                      <div className="invalid-feedback">{validationErrors.email}</div>
                    )}
                  </div>
                  <div className="form-group">
                    <label htmlFor="phone">Phone Number</label>
                    <input
                      type="tel"
                      className={`form-control ${validationErrors.phone && 'is-invalid'}`}
                      id="phone"
                      placeholder="Enter your phone number"
                      onChange={handleInputChange}
                    />
                    {validationErrors.phone && (
                      <div className="invalid-feedback">{validationErrors.phone}</div>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>

          {/* Card 2: Payment Method */}
          <div className="col-md-4 mb-4">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">Payment Method</h5>
                <form>
                  <div className="form-group">
                    <label htmlFor="cardHolder">Cardholder Name</label>
                    <input
                      type="text"
                      className={`form-control ${validationErrors.cardHolder && 'is-invalid'}`}
                      id="cardHolder"
                      placeholder="Enter cardholder name"
                      onChange={handleInputChange}
                    />
                    {validationErrors.cardHolder && (
                      <div className="invalid-feedback">{validationErrors.cardHolder}</div>
                    )}
                  </div>
                  <div className="form-group">
                    <label htmlFor="cardNumber">Card Number</label>
                    <input
                      type="text"
                      className={`form-control ${validationErrors.cardNumber && 'is-invalid'}`}
                      id="cardNumber"
                      placeholder="Enter card number"
                      onChange={handleInputChange}
                    />
                    {validationErrors.cardNumber && (
                      <div className="invalid-feedback">{validationErrors.cardNumber}</div>
                    )}
                  </div>
                  <div className="form-row">
                    <div className="col-md-6">
                      <label htmlFor="expDate">Expiration Date</label>
                      <input
                        type="text"
                        className={`form-control ${validationErrors.expDate && 'is-invalid'}`}
                        id="expDate"
                        placeholder="MM/YYYY"
                        onChange={handleInputChange}
                      />
                      {validationErrors.expDate && (
                        <div className="invalid-feedback">{validationErrors.expDate}</div>
                      )}
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="cvc">CVC</label>
                      <input
                        type="text"
                        className={`form-control ${validationErrors.cvc && 'is-invalid'}`}
                        id="cvc"
                        placeholder="Enter CVC"
                        onChange={handleInputChange}
                      />
                      {validationErrors.cvc && (
                        <div className="invalid-feedback">{validationErrors.cvc}</div>
                      )}
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>

          {/* Card 3: Item Details and Cost */}
          <div className="col-md-4 mb-4">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">Item Details</h5>
                <hr />
                <h6>{selectedEvent.title}</h6>
                <h6>{selectedEvent.venue}</h6>
                <h6>{selectedEvent.date}</h6>
                <hr />
                <h6>{count}</h6>
                <h6>Rs. {price}</h6>
                <button className="btn btn-primary" onClick={subprice}>
                  <strong>-</strong>
                </button>
                &nbsp;&nbsp;&nbsp;
                <button className="btn btn-primary" onClick={addprice}>
                  <strong>+</strong>
                </button>
                <hr />
                <button className="btn btn-primary" onClick={handleMakePayment}>
                  Make Payment
                </button>
                {/* {Object.keys(validationErrors).map((key) => (
                  <p key={key} className="text-danger mt-2">
                    {validationErrors[key]}
                  </p>
                ))} */}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PaymentPage;
