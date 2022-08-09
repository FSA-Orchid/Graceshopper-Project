import React from 'react'
import {connect} from 'react-redux'

/**
 * COMPONENT
 */
export const Home = props => {
  const {username} = props
  return (
    <div>
      <div className='home'>
        <div className='greeting'>
        <h2>Welcome to Guitar Mart!</h2>
        <h4>Your one stop shop for used Guitars!</h4>
        {/* <img className='homeImage'src='/assets/westerbergForSale.jpg'></img> */}
        </div>
      </div>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    username: state.auth.username
  }
}

export default connect(mapState)(Home)
