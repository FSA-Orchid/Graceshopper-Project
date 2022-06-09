import React from 'react'
import { ToastContainer } from 'react-toastify';
import Navbar from './components/Navbar'
import Routes from './Routes'
import { injectStyle } from "react-toastify/dist/inject-style"
const App = () => {
  injectStyle();
  return (
    <div>
      <Navbar />
      <Routes />
      <ToastContainer position="top-center" autoClose={2000} />
    </div>
  )
}

export default App
