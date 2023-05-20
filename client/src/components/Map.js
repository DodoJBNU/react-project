import React, { useEffect } from 'react';
import { KakaoMap } from 'react-kakao-maps';

function Map() {
  const kakao = window.kakao;

  useEffect(() => {
    const container = document.getElementById('map');
    const options = {
      center: new kakao.maps.LatLng(35.846754, 127.129422),
      level: 4,
    };
    const map = new kakao.maps.Map(container, options);
  }, []);

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

export default Map;
