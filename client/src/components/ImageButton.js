import React from 'react';

function ImageButton({ src, alt, onClick, width, height }) {
  return <img src={src} alt={alt} onClick={onClick} style={{ cursor: 'pointer', width: width, height: height }} />;
}

export default ImageButton;
