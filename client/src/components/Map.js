import React, { useEffect, useState } from 'react';
import { KakaoMap } from 'react-kakao-maps';

function Map({ locations }) {
  const kakao = window.kakao;

  useEffect(() => {
    const container = document.getElementById('map');
    const options = {
      center: new kakao.maps.LatLng(35.846754, 127.129422),
      level: 4,
    };
    const map = new kakao.maps.Map(container, options);
    let positions = [];

    for (let i = 0; i < locations.length; i++) {
      positions.push({
        title: locations[i][0],
        latlng: new kakao.maps.LatLng(locations[i][1], locations[i][2]),
      });
    }
    let imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png';

    for (var i = 0; i < positions.length; i++) {
      // 마커 이미지의 이미지 크기 입니다
      var imageSize = new kakao.maps.Size(24, 35);

      // 마커 이미지를 생성합니다
      let markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

      // 마커를 생성합니다
      var marker = new kakao.maps.Marker({
        map: map, // 마커를 표시할 지도
        position: positions[i].latlng, // 마커를 표시할 위치
        title: positions[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
        image: markerImage, // 마커 이미지
      });
    }
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
