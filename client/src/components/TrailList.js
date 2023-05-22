import React, { useEffect, useState } from 'react';
import './TrailList.css';
import { Link, useLocation } from 'react-router-dom';
import ImageButton from './ImageButton';
import backImg from '../img/back.png';
import { IoIosAddCircleOutline } from 'react-icons/io';
import { IoMdArrowRoundBack } from 'react-icons/io';
import axios from 'axios';

// Map의 오른쪽에 위치할 산책로 리스트임.
const TrailList = ({ locationTemp }) => {
  const [trailName, setTrailName] = useState('');
  const [facilityData, setFacilityData] = useState('');
  const [reviewData, setReviewData] = useState('');

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const user_id = searchParams.get('user_id');
  const [locations, SetLocations] = useState([]);

  useEffect(() => {});
  const addLocations = () => {
    const url = '/Add';
    const formData = new FormData();

    formData.append('user_id', user_id);
    formData.append('locations', locations);
    formData.append('trailName', trailName);
    formData.append('facilityData', facilityData);
    formData.append('reviewData', reviewData);

    const config = {
      headers: {
        'content-type': 'multipart/from-data',
      },
    };

    return axios.post(url, formData, config);
  };

  const SaveLocations = () => {
    SetLocations(locationTemp);
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
    addLocations({})
      .then((response) => {
        const url = `/Add?user_id=${user_id}`;

        window.location.href = url;
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <form onSubmit={handleFormSubmit}>
      <div className="AddListMain" style={{ boxSizing: 'border-box', padding: '0' }}>
        <div className="AddList">
          <div className="ListName">
            <div className="AddListButton1" style={{ marginTop: '1.5vh', marginRight: '1vh' }}>
              <Link to={`/Main?user_id=${user_id}`}>
                <IoMdArrowRoundBack className="backimg" />
              </Link>
            </div>
            <span className="AddListText">산책로 추가 메뉴</span>
          </div>
        </div>

        <div className="AddListTextBox">
          <div>
            <input
              placeholder="산책로 이름"
              className="TrailNameText"
              type="text"
              name="TrailName"
              value={trailName}
              onChange={(e) => {
                setTrailName(e.target.value);
              }}
            />
          </div>
          <div>
            <textarea
              className="FacilityNameText"
              placeholder="산책로 편의시설"
              name="FacilityName"
              value={facilityData}
              onChange={(e) => {
                setFacilityData(e.target.value);
              }}
            />
          </div>
          <div>
            <textarea
              className="GuestBookText"
              placeholder="후기를 적어주세요!"
              name="reviewdata"
              value={reviewData}
              onChange={(e) => {
                setReviewData(e.target.value);
                console.log(reviewData);
              }}
            />
          </div>

          <div className="AddListAdd">
            <button
              type="submit"
              onClick={SaveLocations}
              style={{
                display: 'flex',
              }}
              className="AddListAddButton"
            >
              <IoIosAddCircleOutline className="img2"></IoIosAddCircleOutline>
              <span style={{ marginLeft: '1vh' }}>
                <h1 className="addText">추가하기</h1>
              </span>
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default TrailList;
