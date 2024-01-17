import React from 'react'

const LogOut = () => {
    React.useEffect(()=>{
        localStorage.removeItem('token');    
        localStorage.removeItem('id');
        localStorage.removeItem('user');
        console.log("redirecting");
        window.location.href = '/';
      }, [])

  return (
    <div>
        <h1>Log Out</h1>
        <h2>Thank you for using Interpal!</h2>
        <h3>See you soon!</h3>
        <h4>Redirecting</h4>
    </div>

  )
}

export default LogOut;