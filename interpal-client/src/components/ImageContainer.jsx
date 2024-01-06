import React from 'react';

const ImageContainer = () => {
  const containerStyle = {
    display: 'flex',
    justifyContent: 'space-around',
    marginTop: '20px',
  };

  const imgStyle = {
    width: '90%',
    height: '100%',
  };

  const overlayStyle = {
    position: 'absolute',
    bottom: '3%', // Adjust as needed
    left: '50%', // Adjust as needed
    transform: 'translate(-50%, -50%)',
    textAlign: 'center',
    color: 'black',
    width: '80%', // Adjust as needed
  };

  return (
    <div style={containerStyle}>
      <div style={{ position: 'relative' }}>
        <img
          src="https://ik.imagekit.io/shadid/portrait-happy-european-woman-has-broad-smile-closes-eyes-feels-excitement-being-high-spirit.jpg?updatedAt=1701010392771"
          alt="Image 1"
          style={imgStyle}
        />
        <div style={overlayStyle}>
          <h1>Speak with Tandem</h1>
          <p>Master any language by actually chatting with real people</p>
        </div>
      </div>
      <div style={{ position: 'relative' }}>
        <img
          src="https://ik.imagekit.io/shadid/young-bearded-man-with-striped-shirt.jpg?updatedAt=1701010405693"
          alt="Image 2"
          style={imgStyle}
        />
        <div style={overlayStyle}>
          <h1>Another Heading</h1>
          <p>Another paragraph of text</p>
        </div>
      </div>
    </div>
  );
};

export default ImageContainer;
