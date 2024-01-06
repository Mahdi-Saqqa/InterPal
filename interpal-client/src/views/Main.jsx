import React from 'react'
import Navbar from '../components/Navbar'
import Mainpage from '../components/Mainpage'
import ImageContainer from '../components/ImageContainer'

const Main = () => {

  return (
    <div className='main'>
        <Navbar/>
        <Mainpage/>
        <ImageContainer/>
      
    </div>
  )
}

export default Main;