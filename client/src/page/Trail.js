import React, { useEffect, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import Head from '../components/Head';
import axios from 'axios';
function Trail() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const user_id = searchParams.get('user_id');
  const trail_id = searchParams.get('trail_id');

  const [Trails, setTrails] = useState([]);
  // [id, user_id, location_id, title, review, facilities] 형태로 저장.
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
      <div>
        <div>
          <Head />
        </div>
        <div>
          Trail Page; user_id: {user_id} , trail_id : {trail_id}
        </div>
        <div>Trails : {Trails[0]}</div>
        <div>Locations: {Trails[1]}</div>
      </div>
    </form>
  );
}

export default Trail;
