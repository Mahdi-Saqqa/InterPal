import React from 'react'
import Navbar from '../components/Navbar'
import Mainpage from '../components/Mainpage'
import ImageContainer from '../components/ImageContainer'
import Grides from '../components/Grides/Grides'
import Grides2 from '../components/Grides/Grides2'

const Main = () => {

  return (
    <div className='main'>
        <Navbar/>
        <Mainpage/>
        <Grides2/>
        
    </div>
  )
}

export default Main;