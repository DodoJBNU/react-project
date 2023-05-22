import React, { useEffect, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import Head from '../components/Head';
import axios from 'axios';
import LocationMap from '../components/LocationMap';
import './Trail.css';

function Trail() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const user_id = searchParams.get('user_id');
  const trail_id = searchParams.get('trail_id');

  const [Trails, setTrails] = useState([]);
  // [id, user_id, location_id, title, review, facilities]
  // [Latlocation1,Lnglocation1,Latlocation2,Lnglocation2,Latlocation3,Lnglocation3,Latlocation4,Lnglocation4,Latlocation5,Lnglocation5]
  // 이 두 배열을 [[Trail, location]] 과 같은 형태로 저장해두었음.

  const url = `/Trail?user_id=${user_id}&trail_id=${trail_id}`;

  const getTrailData = () => {
    const formData = new FormData();
    formData.append('user_id', user_id);
    formData.append('trail_id', trail_id);

    return axios.post(url, formData);
  };
  useEffect(() => {
    const handleFormSubmit = (e) => {
      getTrailData({})
        .then((response) => {
          setTrails(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    };

    handleFormSubmit(); // 함수 호출 추가
  }, []);
  return (
    <form>
      <div className="Main">
        <div className="Left">
          <Head />
          <div className="Map">
            <LocationMap className="LocationMap" />
          </div>
        </div>
        <div className="Right">hi</div>
      </div>
    </form>
  );
}

export default Trail;
