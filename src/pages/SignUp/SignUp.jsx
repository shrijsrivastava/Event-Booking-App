import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './SignUp.css';

function SignUp() {
  const [userData, setUserData] = useState({
    fullName: '',
    dob: '',
    email: '',
    password: '',
  });

  const [error, setError] = useState('');
  let navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { fullName, dob, email, password } = userData;

    try {
      if (!fullName || !dob || !email || !password) {
        setError('All fields are required');
        return;
      }

      if (!email.includes('@')) {
        setError('Invalid email address');
        return;
      }

      if (password.length < 6) {
        setError('Password must be at least 6 characters');
        return;
      }

      setError('');

      const response = await axios.post("http://localhost:4000/users", userData);
      console.log(response.data);
      alert("Registration Complete");
      navigate('/');
    } catch (error) {
      console.error('Error during registration:', error);
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <div className='block'>
      <div className='flex-container'>
        <div className="flex-item1"></div>
        <div className="flex-item2">
          <div className='datafields'>
            <div className='container'>
              <h2><strong>Hello</strong>, Grab seats for your upcoming favorite event!</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-floating mt-3">
                  <input
                    type="text"
                    className="form-control"
                    id="fullName"
                    name="fullName"
                    placeholder="name"
                    value={userData.fullName}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="fullName">Full Name</label>
                </div>
                <div className="form-floating mt-3">
                  <input
                    type="date"
                    className="form-control dob"
                    id="dob"
                    name="dob"
                    placeholder="DOB"
                    value={userData.dob}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="dob">Date of Birth</label>
                </div>
                <div className="form-floating mt-3">
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    placeholder="name@example.com"
                    value={userData.email}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="email">Email address</label>
                </div>
                <div className="form-floating mt-3 mb-3">
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    placeholder="Password"
                    value={userData.password}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="password">Password</label>
                </div>
                {error && <div className="text-danger">{error}</div>}
                <button type="submit" className="btn btn-primary">Sign Up</button>
              </form>
              <div className="mt-3">Already a user!<Link to='/' className='link-style'>Sign In</Link></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
