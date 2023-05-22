import React, { useEffect, useState } from 'react';
import { KakaoMap } from 'react-kakao-maps';
import { useLocation } from 'react-router-dom';
import Trail from '../page/Trail';
import './LocationMap.css';

function LocationMap({ locations }) {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const user_id = searchParams.get('user_id');
  const url = `/Main?user_id=${user_id}`;

  const kakao = window.kakao;
  useEffect(() => {
    const container = document.getElementById('map');
    const options = {
      center: new kakao.maps.LatLng(35.846754, 127.129422),
      level: 4,
    };
    const map = new kakao.maps.Map(container, options);
  });

  return (
    <div
      id="map"
      style={{
        width: '100%',
        height: '100%',
        boxSizing: 'border-box',
        padding: '0',
      }}
    ></div>
  );
}

export default LocationMap;
