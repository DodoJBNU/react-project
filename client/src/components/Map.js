import React, { useEffect, useState } from 'react';
import { KakaoMap } from 'react-kakao-maps';
import { useLocation } from 'react-router-dom';
import Trail from '../page/Trail';
function Map({ locations }) {
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
    let positions = [];

    for (let i = 0; i < locations.length; i++) {
      positions.push({
        id: locations[i][0], // 나중에 title 수정하기. 현재는 trail_id
        title: '',
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
      let marker = new kakao.maps.Marker({
        map: map, // 마커를 표시할 지도
        position: positions[i].latlng, // 마커를 표시할 위치
        title: positions[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
        image: markerImage, // 마커 이미지
        id: positions[i].id,
        clickable: true, // 마커를 클릭했을 때 지도의 클릭 이벤트가 발생하지 않도록 설정합니다
      });

      (function (TrailId) {
        kakao.maps.event.addListener(marker, 'click', function () {
          // 클로저 내부에서 markerId 값을 가져와 사용
          window.location.href = `/Trail?user_id=${user_id}&trail_id=${TrailId}`;
        });
      })(positions[i].id);
    }
  }, [locations]);

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
