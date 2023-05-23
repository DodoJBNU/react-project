import React, { useEffect } from 'react';
import { KakaoMap } from 'react-kakao-maps';
import { useLocation } from 'react-router-dom';
import './LocationMap.css';

function LocationMap({ TrailData }) {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const user_id = searchParams.get('user_id');
  const url = `/Trail?user_id=${user_id}`;

  const calculateDistance = (start, end) => {
    const lat1 = start.getLat();
    const lng1 = start.getLng();
    const lat2 = end.getLat();
    const lng2 = end.getLng();

    const R = 6371; // 지구의 반지름 (단위: km)
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lng2 - lng1) * Math.PI) / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c * 1000; // 단위를 미터로 변환

    // 반올림 해주자.
    return parseInt(distance);
  };

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
      const lineDistances = [];
      for (let i = 0; i < TrailData[1].length; i += 2) {
        const lat = TrailData[1][i];
        const lng = TrailData[1][i + 1];
        if (lat && lng) {
          linePath.push(new kakao.maps.LatLng(lat, lng));
        }
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

      // 마커
      const markerOptions = {
        position: new kakao.maps.LatLng(TrailData[1][0], TrailData[1][1]),
        clickable: false,
      };
      const marker = new kakao.maps.Marker(markerOptions);
      marker.setMap(map);

      // 기존의 위도 경도 지점에 도트를 표시
      const dotOptions = {
        dotSize: 4,
        dotColor: '#db4040',
        zIndex: 3,
      };

      let sum = 0;

      for (let i = 0; i < linePath.length; i++) {
        const position = linePath[i];
        const dot = new kakao.maps.CustomOverlay({
          position: position,
          content: '<span class="dot"></span>',
          ...dotOptions,
        });

        dot.setMap(map);

        const startPosition = linePath[i];
        const endPosition = linePath[i + 1];

        if (endPosition) {
          const lineDistance = calculateDistance(startPosition, endPosition); // 경로의 거리 계산

          sum += lineDistance;
          lineDistances.push(lineDistance); // 거리를 배열에 저장

          // ...

          // 경로별 거리 표시
          if (i != linePath.length - 2) {
            const distanceOverlay = new kakao.maps.CustomOverlay({
              content: `<div class="dotOverlay">거리 <span class="number">${sum}m</span></div>`,
              position: endPosition,
              yAnchor: 1,
              zIndex: 2,
            });

            distanceOverlay.setMap(map);
          }
        }
      }

      // ...

      // 총 거리 표시
      const totalDistance = lineDistances.reduce((acc, cur) => acc + cur, 0);

      if (totalDistance > 0) {
        const walkTime = Math.floor(totalDistance / 67); // In minutes

        let walkHour = '';
        let walkMin = '';

        // Convert walking time to hours and minutes if it exceeds 60 minutes
        if (walkTime >= 60) {
          walkHour = Math.floor(walkTime / 60) + '시간 ';
        }
        walkMin = (walkTime % 60) + '분';

        // Calculate cycling time
        const bikeTime = Math.floor(totalDistance / 227); // In minutes

        let bikeHour = '';
        let bikeMin = '';

        // Convert cycling time to hours and minutes if it exceeds 60 minutes
        if (bikeTime >= 60) {
          bikeHour = Math.floor(bikeTime / 60) + '시간 ';
        }
        bikeMin = (bikeTime % 60) + '분';

        var content = '<ul class="dotOverlay distanceInfo">';
        content += '  <li>';
        content += '    <span class="label">총거리</span>';
        content += '    <span class="number">' + totalDistance + '</span>m';
        content += '  </li>';
        content += '  <li>';
        content += '    <span class="label">도보</span>';
        content += '    <span class="number">' + walkHour + walkMin + '</span>';
        content += '  </li>';
        content += '  <li>';
        content += '    <span class="label">자전거</span>';
        content += '    <span class="number">' + bikeHour + bikeMin + '</span>';
        content += '  </li>';
        content += '</ul>';

        const totalDistanceOverlay = new kakao.maps.CustomOverlay({
          content: content,
          position: linePath[linePath.length - 1],
          xAnchor: 0,
          yAnchor: 1.2,
          zIndex: 3,
        });
        totalDistanceOverlay.setMap(map);
      }
    };
    drawPathAndDots();
  }, [TrailData]);
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
