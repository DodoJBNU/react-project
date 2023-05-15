import React from 'react';

import inquiryImg from '../img/inquiry.png';
import AddImg from '../img/add.png';
import TrailImg from '../img/mytrail.png';
import favImg from '../img/fav.png';
import exitImg from '../img/exit.png';
import { Link } from 'react-router-dom';
function List() {
  // 목록 데이터

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(157,211,168,1)',
        textAlign: 'center',
        border: '0.5vh solid',
      }}
      className="MainList"
    >
      <div className="List">산책로 목록</div>

      <div className="item1">
        <div>
          <img className="l1img" alt="inquiryImg" src={inquiryImg} />
        </div>
        <div className="l1font">
          <Link to="/Add" type="button">
            산책로 조회
          </Link>
        </div>
      </div>

      <div className="item2">
        <div>
          <img className="l2img" alt="addImg" src={AddImg} />
        </div>
        <div className="l2font">산책로 추가</div>
      </div>

      <div className="item3">
        <div>
          <img className="l3img" alt="mytrailImg" src={TrailImg} />
        </div>
        <div className="l3font">내가 추가한 산책로</div>
      </div>

      <div className="item4">
        <div>
          <img className="l4img" alt="FavoriteImg" src={favImg} />
        </div>
        <div className="l4font">즐겨찾기</div>
      </div>

      <div className="item5">
        <div>
          <img className="l5img" alt="exitImg" src={exitImg} />
        </div>
        <div className="l5font">종료</div>
      </div>
    </div>
  );
}

export default List;
