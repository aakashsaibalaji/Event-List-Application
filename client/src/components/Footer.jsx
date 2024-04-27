import React from 'react'
import { Link } from 'react-router-dom';
import '../style/footer.css'
const Footer = () => {
  return (
    <div>
        <div className='container-fluid main pt-3'>
          <div className='row d-flex justify-content-between'>
              <div className='col-lg-4 col-md-8 col-11'>
                  <ul>
                      <li><Link to='/home'>Home</Link></li>
                      <li><Link to='/Event'>Event</Link></li>
                  </ul>
              </div>
              <div className='col-lg-4 col-md-8 col-11'>
                  <ul>
                      <li><Link to="/register">register</Link></li>
                      <li><Link to="/login">Login</Link></li>
                  </ul>
              </div>
          </div>
          <div className='row d-flex text-center'>
              <p>&copy;2024 Ecommerce. All rights reserved.</p>
          </div>
      </div>
    </div>
  )
}

export default Footer