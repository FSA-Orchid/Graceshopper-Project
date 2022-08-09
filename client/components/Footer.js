
import React from 'react';
import {Link} from 'react-router-dom'
import { connect } from 'react-redux';

export function Footer (props) {
  return (
    <div className='footer'>
      <h6 className='footerLink'>Guitar Mart is a currently fictional store front. Site is a mock-up. Copy 2022</h6>
    <div className='footerNav'>
    <Link to='/products'>
              <button className='footerLink'>All Products</button>
            </Link>
            {props.user.id ?
            <>
            <h4>|</h4>
            <Link to='/user'>
              <button className='footerLink'>User Info</button>
            </Link> </> : <></>}
            <h4>|</h4>
            <Link to="/about">
              <button className='footerLink'>About Us</button>
            </Link>


    </div>

    <Link className="navText" to="/">
            <img
              className="logo"
              src="assets/guitarmart.png"
              width="100px"
              height="100px"

            />
          </Link>
    </div>
  )
}

const mapStateToProps = (reduxState) => ({
  user: reduxState.auth
})

export default connect(mapStateToProps, null)(Footer)
