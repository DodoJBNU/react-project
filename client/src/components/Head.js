import React from 'react';
import HeadImg from '../img/Headimg.png';
import './Head.css';
function Head() {
  return (
    <div
      style={{
        height: '10vh',
        display: 'flex',
        backgroundColor: 'white',
      }}
    >
      <div
        style={{
          width: '5vw',
          backgroundColor: 'white',
          height: '10vh',
        }}
      >
        <img className="HeadImg1" alt="HeadImg1" src={HeadImg} />
      </div>
      <div className="Headfont" style={{ backgroundColor: 'white', color: 'black' }}>
        <span className="HeadText">마이 산책로</span>
      </div>
    </div>
  );
}

export default Head;
