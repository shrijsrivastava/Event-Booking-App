import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Burger.css';

const BurgerMenu = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      <button onClick={toggleMenu} className={`burger-icon ${menuOpen ? 'open' : ''}`}>
        ☰
      </button>

      <div className={`menu-overlay ${menuOpen ? 'open' : ''}`} onClick={toggleMenu}></div>

      <div className={`sliding-menu ${menuOpen ? 'open' : ''}`}>
        <ul className="nav flex-column mt-2">
          <li className="nav-item">
            <Link className='nav-link' to='/HomePage'>HomePage</Link>
          </li>
          <li className="nav-item">
            <Link className='nav-link' to='/BookedEvent'>Booked Events</Link>
          </li>
          <li className="nav-item logout">
            <Link className='nav-link' to='/'>LogOut</Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default BurgerMenu;
