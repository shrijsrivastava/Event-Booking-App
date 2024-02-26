import { Link } from 'react-router-dom';
import './Footer.css'

function Footer() {
  return (
    <footer>
    <div className="footer-container d-flex justify-content-around">
      <div className="footer-section lg">
        <h3>About Us</h3>
        <p style={{color:'white'}}>Welcome to our event booking platform! We're your dedicated team here to simplify and elevate your event planning experience. We offer a curated selection of venues and entertainment options. Let's turn your ideas into unforgettable moments together!</p>
      </div>
      <div className="footer-section sm">
        <h3>Quick Links</h3>
        <ul>
          <li><Link className='nav-link' to='/HomePage'>HomePage</Link></li>
          <li><Link className='nav-link' to='/'>LogOut</Link></li>
        </ul>
      </div>
    </div>
    <div className="footer-bottom" >
      <p style={{color:'white'}}>&copy; 2024 Your Website. All rights reserved.</p>
    </div>
  </footer>

  )
}

export default Footer