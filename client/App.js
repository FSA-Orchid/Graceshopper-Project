import React from 'react'
import { ToastContainer } from 'react-toastify';
import Navbar from './components/Navbar'
import Routes from './Routes'

const App = () => {

  return (
    <div>
      <Navbar />
      <Routes />
      <ToastContainer position="top-center" autoClose={2000} />
    </div>
  )
}

export default App
