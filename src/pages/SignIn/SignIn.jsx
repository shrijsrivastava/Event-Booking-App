import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { DataContext } from '../../context/dataContext';
import './SignIn.css';
import axios from 'axios';

function SignIn() {
  const { user, setUser } = useContext(DataContext);
  const [error, setError] = useState('');
  let navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!user.email || !user.email.includes('@')) {
        setError('Invalid email address');
        return;
      }

      if (!user.password || user.password.length < 6) {
        setError('Password must be at least 6 characters');
        return;
      }

      setError('');

      const response = await axios.get("http://localhost:4000/users");
      const userData = response.data;

      if (userData) {
        const newUser = userData.find(x => x.email === user.email && x.password === user.password);

        if (newUser) {
          setUser(newUser);
          navigate('/HomePage');
        } else {
          setError('Invalid credentials');
        }
      } else {
        console.log('Invalid JSON format: Missing "users" property');
      }
    } catch (error) {
      console.error('Error fetching JSON data:', error);
    }
  };

  return (
    <div className='container'>
      <h2 className='text-center'><strong>Hello</strong>, Grab seats for your upcoming favorite event!</h2>
      <form onSubmit={handleSubmit} className='mt-3'>
        <div className="form-floating mb-3">
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            placeholder="name@example.com"
            value={user.email}
            onChange={handleInputChange}
          />
          <label htmlFor="email">Email address</label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            placeholder="Password"
            value={user.password}
            onChange={handleInputChange}
          />
          <label htmlFor="password">Password</label>
        </div>
        {error && <div className="alert alert-danger">{error}</div>}
        <button type="submit" className="btn btn-block">
          Sign in
        </button>
      </form>
      <div className="text-center">New User, Get Yourself Registered! <Link to='/SignUp' className='link-style'>SignUp</Link></div>
    </div>
  );
}

export default SignIn;
