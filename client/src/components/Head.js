import React from 'react';
import HeadImg from '../img/Headimg.png';
import './Head.css';
function Head() {
  return (
    <div>
      <div>
        <div className="Main">
          <div className="Headfont">
            <span className="HeadText">마이 산책로</span>
          </div>
          <div className="img">
            <img alt="HeadImg1" src={HeadImg} style={{ width: '6vh', height: '6vh', marginTop: '2vh' }} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Head;
