import React from 'react';

import './AddList.css';
import ImageButton from './ImageButton';
import backImg from '../img/back.png';
import { Link } from 'react-router-dom';
import Addimg from '../img/add.png';
function AddList() {
  return (
    <div className="AddListMain">
      <div className="AddList">
        <div className="ListName">산책로 추가 메뉴</div>
        <div
          className="AddListButton1"
          style={{ marginTop: '1.5vh', marginRight: '1vh' }}
        >
          <Link to="/Main">
            <ImageButton
              src={backImg}
              alt="AddListBackButton"
              width={'3vw'}
              height={'5vh'}
            />
          </Link>
        </div>
      </div>
      <hr />
      <div className="TrailNameBox">
        <input
          className="TrailName"
          type="text"
          placeholder="산책로 이름 : 예 ) 덕진호 산책로"
        />
      </div>
      <div className="TrailFeatureBox">
        <input
          className="TrailFeature"
          type="text"
          placeholder="산책로 특징을 적어주세요."
        />
      </div>
      <div className="TrailFacilityBox">
        <input
          className="TrailFacility"
          type="text"
          placeholder="편의 시설을 입력해주세요."
        />
      </div>

      <div className="Temp1Box">
        <input className="Temp1" type="text" placeholder="임시" />
      </div>
      <div className="Temp2Box">
        <input className="Temp2" type="text" placeholder="임시" />
      </div>
      <hr />
      <div className="AddListAdd">
        <div className="AddListAddButton">
          <ImageButton
            src={Addimg}
            alt="AddListAddButton"
            width={'3vw'}
            height={'5vh'}
          />
        </div>
        산책로에 추가하기
      </div>
    </div>
  );
}

export default AddList;
