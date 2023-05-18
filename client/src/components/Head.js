import React from 'react';
import HeadImg from '../img/Headimg.png';
function Head() {
  return (
    <div
      style={{
        height: '10vh',
        display: 'flex',
        backgroundColor: 'rgba(157,211,168,1)',
      }}
    >
      <div
        style={{
          width: '5vw',
          backgroundColor: 'rgba(157,211,168,1)',
          height: '10vh',
        }}
      >
        <img className="HeadImg1" alt="HeadImg1" src={HeadImg} />
      </div>
      <div className="Headfont" style={{ backgroundColor: 'rgba(157,211,168,1)', color: 'black' }}>
        마이 산책로
      </div>
    </div>
  );
}

export default Head;
