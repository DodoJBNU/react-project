import React, { useEffect, useState } from 'react';
import './AddList.css';
import ImageButton from './ImageButton';
import backImg from '../img/back.png';
import { Link, useLocation } from 'react-router-dom';
import Addimg from '../img/add.png';
import { IoIosAddCircleOutline } from 'react-icons/io';
import axios from 'axios';

function AddList() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const user_id = searchParams.get('user_id');

  let locationTemp = [];
  const [locations, SetLocations] = useState([]);

  useEffect(() => {
    /// 아래는 Map
    const kakao = window.kakao;

    var mapContainer = document.getElementById('map'), // 지도를 표시할 div
      mapOption = {
        center: new kakao.maps.LatLng(35.846754, 127.129422),
        level: 4,
      };

    var map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다

    var drawingFlag = false; // 선이 그려지고 있는 상태를 가지고 있을 변수입니다
    var moveLine; // 선이 그려지고 있을때 마우스 움직임에 따라 그려질 선 객체 입니다
    var clickLine; // 마우스로 클릭한 좌표로 그려질 선 객체입니다
    var distanceOverlay; // 선의 거리정보를 표시할 커스텀오버레이 입니다
    var dots = {}; // 선이 그려지고 있을때 클릭할 때마다 클릭 지점과 거리를 표시하는 커스텀 오버레이 배열입니다.

    // 지도에 클릭 이벤트를 등록합니다
    // 지도를 클릭하면 선 그리기가 시작됩니다 그려진 선이 있으면 지우고 다시 그립니다
    kakao.maps.event.addListener(map, 'click', function (mouseEvent) {
      // 마우스로 클릭한 위치입니다

      var clickPosition = mouseEvent.latLng;

      /*
      for (let i = 0; i < latitude.length; i++) {
        console.log(latitude[i]);
        console.log(longitude[i]);
      }
      */

      if (!drawingFlag) {
        drawingFlag = true;

        deleteClickLine();
        deleteDistnce();
        deleteCircleDot();

        clickLine = new kakao.maps.Polyline({
          map: map,
          path: [clickPosition],
          strokeWeight: 3,
          strokeColor: '#db4040',
          strokeOpacity: 1,
          strokeStyle: 'solid',
        });

        // 선이 그려지고 있을 때 마우스 움직임에 따라 선이 그려질 위치를 표시할 선을 생성합니다
        moveLine = new kakao.maps.Polyline({
          strokeWeight: 3,
          strokeColor: '#db4040',
          strokeOpacity: 0.5,
          strokeStyle: 'solid',
        });

        displayCircleDot(clickPosition, 0);
      } else {
        if (locationTemp.length === 0) locationTemp[locationTemp.length] = clickLine.getPath();
        locationTemp[locationTemp.length] = clickPosition;
        var path = clickLine.getPath();
        path.push(clickPosition);
        clickLine.setPath(path);

        var distance = Math.round(clickLine.getLength());
        displayCircleDot(clickPosition, distance);
      }
    });

    kakao.maps.event.addListener(map, 'mousemove', function (mouseEvent) {
      if (drawingFlag) {
        var mousePosition = mouseEvent.latLng;
        var path = clickLine.getPath();
        var movePath = [path[path.length - 1], mousePosition];
        moveLine.setPath(movePath);
        moveLine.setMap(map);

        var distance = Math.round(clickLine.getLength() + moveLine.getLength());
        var content = '<div class="dotOverlay distanceInfo">총거리 <span class="number">' + distance + '</span>m</div>' + showDistance(content, mousePosition);
      }
    });

    kakao.maps.event.addListener(map, 'rightclick', function (mouseEvent) {
      if (drawingFlag) {
        moveLine.setMap(null);
        moveLine = null;

        var path = clickLine.getPath();

        if (path.length > 1) {
          if (dots[dots.length - 1].distance) {
            dots[dots.length - 1].distance.setMap(null);
            dots[dots.length - 1].distance = null;
          }

          var distance = Math.round(clickLine.getLength());
          var content = getTimeHTML(distance);

          showDistance(content, path[path.length - 1]);
        } else {
          deleteClickLine();
          deleteCircleDot();
          deleteDistnce();
        }

        drawingFlag = false;
      }
    });

    function deleteClickLine() {
      // 그려진 선이 있다면 초기화.
      if (clickLine) {
        clickLine.setMap(null);
        clickLine = null;
        locationTemp = [];
      }
    }

    function showDistance(content, position) {
      if (distanceOverlay) {
        distanceOverlay.setPosition(position);
        distanceOverlay.setContent(content);
      } else {
        distanceOverlay = new kakao.maps.CustomOverlay({
          map: map,
          content: content,
          position: position,
          xAnchor: 0,
          yAnchor: 0,
          zIndex: 3,
        });
      }
    }

    // 그려지고 있는 선의 총거리 정보와
    // 선 그리가 종료됐을 때 선의 정보를 표시하는 커스텀 오버레이를 삭제하는 함수입니다
    function deleteDistnce() {
      if (distanceOverlay) {
        distanceOverlay.setMap(null);
        distanceOverlay = null;
      }
    }

    // 선이 그려지고 있는 상태일 때 지도를 클릭하면 호출하여
    // 클릭 지점에 대한 정보 (동그라미와 클릭 지점까지의 총거리)를 표출하는 함수입니다
    function displayCircleDot(position, distance) {
      // 클릭 지점을 표시할 빨간 동그라미 커스텀오버레이를 생성합니다
      var circleOverlay = new kakao.maps.CustomOverlay({
        content: '<span class="dot"></span>',
        position: position,
        zIndex: 1,
      });

      // 지도에 표시합니다
      circleOverlay.setMap(map);

      if (distance > 0) {
        // 클릭한 지점까지의 그려진 선의 총 거리를 표시할 커스텀 오버레이를 생성합니다
        var distanceOverlay = new kakao.maps.CustomOverlay({
          content: '<div class="dotOverlay">거리 <span class="number">' + distance + '</span>m</div>',
          position: position,
          yAnchor: 1,
          zIndex: 2,
        });

        // 지도에 표시합니다
        distanceOverlay.setMap(map);
      }

      // 배열에 추가합니다
      dots.push({ circle: circleOverlay, distance: distanceOverlay });
    }

    // 클릭 지점에 대한 정보 (동그라미와 클릭 지점까지의 총거리)를 지도에서 모두 제거하는 함수입니다
    function deleteCircleDot() {
      var i;

      for (i = 0; i < dots.length; i++) {
        if (dots[i].circle) {
          dots[i].circle.setMap(null);
        }

        if (dots[i].distance) {
          dots[i].distance.setMap(null);
        }
      }

      dots = [];
    }

    // 마우스 우클릭 하여 선 그리기가 종료됐을 때 호출하여
    // 그려진 선의 총거리 정보와 거리에 대한 도보, 자전거 시간을 계산하여
    // HTML Content를 만들어 리턴하는 함수입니다
    function getTimeHTML(distance) {
      // 도보의 시속은 평균 4km/h 이고 도보의 분속은 67m/min입니다
      var walkkTime = (distance / 67) | 0;
      var walkHour = '',
        walkMin = '';

      // 계산한 도보 시간이 60분 보다 크면 시간으로 표시합니다
      if (walkkTime > 60) {
        walkHour = '<span class="number">' + Math.floor(walkkTime / 60) + '</span>시간 ';
      }
      walkMin = '<span class="number">' + (walkkTime % 60) + '</span>분';

      // 자전거의 평균 시속은 16km/h 이고 이것을 기준으로 자전거의 분속은 267m/min입니다
      var bicycleTime = (distance / 227) | 0;
      var bicycleHour = '',
        bicycleMin = '';

      // 계산한 자전거 시간이 60분 보다 크면 시간으로 표시합니다
      if (bicycleTime > 60) {
        bicycleHour = '<span class="number">' + Math.floor(bicycleTime / 60) + '</span>시간 ';
      }
      bicycleMin = '<span class="number">' + (bicycleTime % 60) + '</span>분';

      // 거리와 도보, 자전거 시간을 가지고 HTML Content를 만들어 리턴합니다
      var content = '<ul class="dotOverlay distanceInfo">';
      content += '  <li>';
      content += '    <span class="label">총거리</span>';
      content += '    <span class="number">' + distance + '</span>m';
      content += '  </li>';
      content += '  <li>';
      content += '    <span class="label">도보</span>';
      content += '    <span class="number">' + walkHour + walkMin + '</span>';
      content += '  </li>';
      content += '  <li>';
      content += '    <span class="label">자전거</span>';
      content += '    <span class="number">' + bicycleHour + bicycleMin + '</span>';
      content += '  </li>';
      content += '</ul>';

      return content;
    }
  });

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
  const addLocations = () => {
    const url = '/Add';
    const formData = new FormData();

    formData.append('user_id', user_id);
    formData.append('locations', locations);
    const config = {
      headers: {
        'content-type': 'multipart/from-data',
      },
    };

    return axios.post(url, formData, config);
  };
  const SaveLocations = () => {
    console.log(locationTemp);
    SetLocations(locationTemp);
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'row' }}>
        <div
          id="map"
          style={{
            boxSizing: 'border-box',
            padding: '0',
            border: '0.5vh solid',
            flex: 6,
          }}
        ></div>
        <div className="AddListMain" style={{ flex: 4, boxSizing: 'border-box', padding: '0', border: '0.5vh solid' }}>
          <div className="AddList">
            <div className="ListName">산책로 추가 메뉴</div>
            <div className="AddListButton1" style={{ marginTop: '1.5vh', marginRight: '1vh' }}>
              <Link to={`/Main?user_id=${user_id}`}>
                <ImageButton src={backImg} alt="AddListBackButton" width={'3vw'} height={'5vh'} />
              </Link>
            </div>
          </div>
          <hr />

          <div className="AddListTextBox">
            <div>
              <input placeholder="산책로 이름" className="TrailNameText" type="text" />
            </div>
            <div>
              <textarea className="FacilityNameText" placeholder="산책로 편의시설" />
            </div>
            <div>
              <textarea className="GuestBookText" placeholder="후기를 적어주세요!" />
            </div>
          </div>
          <hr />
          <div className="AddListAdd">
            <button
              type="submit"
              onClick={SaveLocations}
              style={{
                backgroundColor: 'rgba(157,211,168,1)',
                display: 'flex',
              }}
              className="AddListAddButton"
            >
              <IoIosAddCircleOutline style={{ fontSize: '6vh', marginLeft: '4vh' }}></IoIosAddCircleOutline>
              <span style={{ marginLeft: '7vh' }}>
                <h1 style={{ lineHeight: '6vh' }}>산책로에 추가하기</h1>
              </span>
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default AddList;
