import React from 'react'
import './Main.css'
import UserCard from '../components/UserCard'
const Main = () => {
  return (
    <div className='main row '>
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
    </div>
  )
}

export default Main