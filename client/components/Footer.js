
import React from 'react';

import {Link} from 'react-router-dom'

export default function Footer () {
  return (
    <div className='footer'>
      <h6 className='footerLink'>Guitar Mart is a currently fictional store front. Site is a mock-up. Copy 2022</h6>
    <div className='footerNav'>
    <Link to='/products'>
              <button className='footerLink'>All Products</button>
            </Link>
            <h4>|</h4>
            <Link to='/user'>
              <button className='footerLink'>User Info</button>
            </Link>
            <h4>|</h4>
            <Link to="/about">
              <button className='footerLink'>About Us</button>
            </Link>


    </div>

    <Link className="navText" to="/">
            <img
              className="logo"
              src="guitarmart.png"
              width="100px"
              height="100px"

            />
          </Link>
    </div>
  )
}
