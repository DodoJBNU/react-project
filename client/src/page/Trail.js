import React, { useEffect, useState } from 'react';
import { useLocation, useSearchParams, Link } from 'react-router-dom';
import Head from '../components/Head';
import axios from 'axios';
import LocationMap from '../components/LocationMap';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { RiMailAddLine } from 'react-icons/ri';
import { AiOutlineUser } from 'react-icons/ai';
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
      {Trails.length > 0 && (
        <div className="Main">
          <div className="Left">
            <div className="Map">
              <LocationMap TrailData={Trails} className="LocationMap" />
            </div>
          </div>
          <div className="Right">
            <div className="head">
              <Head />
            </div>
            <div className="TrailDataListMain">
              <div className="TrailDataBox">
                <div className="DataBoxHead">
                  <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <div className="DataBoxButtonSpace">
                      <Link to={`/Main?user_id=${user_id}`}>
                        <IoMdArrowRoundBack className="DataBoxBackButton" />
                      </Link>
                    </div>
                    <span className="DataBoxHeadText">{Trails[0][3].length != 0 ? Trails[0][3] : '산책로 이름이 없습니다.'}</span>
                  </div>
                </div>
                <div className="TrailReview">{Trails[0][4].length != 0 ? Trails[0][4] : '사용자 후기가 존재하지 않습니다.'}</div>
                <div className="TrailFacilities">
                  <div className="TrailFacilitiesHead">편의시설</div>
                  <div className="TrailFacilitiesBody">{Trails[0][5].length != 0 ? Trails[0][5] : '편의시설 정보가 존재하지 않습니다.'}</div>
                </div>
                <div className="CommentBox">
                  <div className="ShowComments">
                    <div className="ShowCommentsHead">댓글</div>
                  </div>
                  <div className="AddComment">
                    <div className="UserImg">
                      <AiOutlineUser className="UserImgFile" />
                    </div>
                    <input className="AddCommentTextBox" type="text" />
                    <div className="AddCommentButtonBox">
                      <button className="AddCommentButton">
                        <RiMailAddLine className="CommentButtonImg" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </form>
  );
}

export default Trail;
