import React from 'react';
import { Link } from 'react-router-dom';

const Mainpage = () => {
  const containerStyle = {
    height: '400px',
    backgroundImage: 'url("https://ik.imagekit.io/shadid/15841841_v935-aum-16.jpg?updatedAt=1700931734217")',
    backgroundSize: 'cover',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    color: '#fff',
    position: 'relative',
  };

  const textStyle = {
    fontSize: '24px',
    marginBottom: '20px',
    color: 'black',
  };

  const bottomTextStyle = {
    width: '100%',
    textAlign: 'center',
    color: '#555',
    
  };

  return (
    <div style={containerStyle}>
      <div style={textStyle}>
        <h1>Speak with Tandem</h1>
        <p>Master any language by actually chatting with real people</p>
      </div>
      <div style={bottomTextStyle}>
      <Link to="/your-link-url" style={{ color: '#555', textDecoration: 'none', border: '1px solid ', borderRadius: '2px', height: '60px', width: '200px', display: 'inline-block', lineHeight: '60px' }}>
          Join us 
        </Link>
      </div>
    </div>
  );
};


export default Mainpage;
