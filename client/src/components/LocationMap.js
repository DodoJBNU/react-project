import React, { useEffect } from 'react';
import { KakaoMap } from 'react-kakao-maps';
import { useLocation } from 'react-router-dom';
import './LocationMap.css';

function LocationMap({ TrailData }) {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const user_id = searchParams.get('user_id');
  const url = `/Main?user_id=${user_id}`;

  useEffect(() => {
    const container = document.getElementById('map');
    const kakao = window.kakao;
    const options = {
      center: new kakao.maps.LatLng(TrailData[1][0], TrailData[1][1]),
      level: 4,
    };
    const map = new kakao.maps.Map(container, options);

    // 경로를 그리고 도트를 표시하는 함수
    const drawPathAndDots = () => {
      const linePath = [];

      if (TrailData[1][0] && TrailData[1][1]) {
        linePath.push(new kakao.maps.LatLng(TrailData[1][0], TrailData[1][1]));
      }
      if (TrailData[1][2] && TrailData[1][3]) {
        linePath.push(new kakao.maps.LatLng(TrailData[1][2], TrailData[1][3]));
      }
      if (TrailData[1][4] && TrailData[1][5]) {
        linePath.push(new kakao.maps.LatLng(TrailData[1][4], TrailData[1][5]));
      }
      if (TrailData[1][6] && TrailData[1][7]) {
        linePath.push(new kakao.maps.LatLng(TrailData[1][6], TrailData[1][7]));
      }
      if (TrailData[1][8] && TrailData[1][9]) {
        linePath.push(new kakao.maps.LatLng(TrailData[1][8], TrailData[1][9]));
      }

      const polyline = new kakao.maps.Polyline({
        map: map,
        path: linePath,
        strokeWeight: 3,
        strokeColor: '#db4040',
        strokeOpacity: 1,
        strokeStyle: 'solid',
      });

      polyline.setMap(map);

      // 기존의 위도 경도 지점에 도트를 표시
      const dotOptions = {
        dotSize: 4,
        dotColor: '#db4040',
        zIndex: 3,
      };

      const dot1 = new kakao.maps.CustomOverlay({
        position: new kakao.maps.LatLng(TrailData[1][0], TrailData[1][1]),
        content: '<span class="dot"></span>',
        ...dotOptions,
      });
      dot1.setMap(map);

      const dot2 = new kakao.maps.CustomOverlay({
        position: new kakao.maps.LatLng(TrailData[1][2], TrailData[1][3]),
        content: '<span class="dot"></span>',
        ...dotOptions,
      });
      dot2.setMap(map);

      const dot3 = new kakao.maps.CustomOverlay({
        position: new kakao.maps.LatLng(TrailData[1][4], TrailData[1][5]),
        content: '<span class="dot"></span>',
        ...dotOptions,
      });
      dot3.setMap(map);

      const dot4 = new kakao.maps.CustomOverlay({
        position: new kakao.maps.LatLng(TrailData[1][6], TrailData[1][7]),
        content: '<span class="dot"></span>',
        ...dotOptions,
      });
      dot4.setMap(map);

      const dot5 = new kakao.maps.CustomOverlay({
        position: new kakao.maps.LatLng(TrailData[1][8], TrailData[1][9]),
        content: '<span class="dot"></span>',
        ...dotOptions,
      });
      dot5.setMap(map);
    };
    drawPathAndDots(); // 경로와 도트 그리기 함수 호출
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

export default LocationMap;
