import React, { useEffect, useState } from 'react';
import { useLocation, useSearchParams, Link, useResolvedPath } from 'react-router-dom';
import Head from '../components/Head';
import axios from 'axios';
import LocationMap from '../components/LocationMap';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { RiMailAddLine } from 'react-icons/ri';
import { AiOutlineUser } from 'react-icons/ai';
import { BsBookmarkStar } from 'react-icons/bs';
import CommentList from '../components/CommentList';
import './Trail.css';

function Trail() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const user_id = searchParams.get('user_id');
  const trail_id = searchParams.get('trail_id');

  const [flag, setFlag] = useState(0);
  const [comment, setComment] = useState('');
  const [Trails, setTrails] = useState([]);
  const [action, setAction] = useState('');
  // [id, user_id, location_id, title, review, facilities]
  // [Latlocation1,Lnglocation1,Latlocation2,Lnglocation2,Latlocation3,Lnglocation3,Latlocation4,Lnglocation4,Latlocation5,Lnglocation5]
  // [comment_id, user_id, trail_id, comment]
  // flag = 0 -> 즐겨찾기 추가 안된상태. flag = 1 즐찾 O 상태.
  // 이 세 배열을 [[Trail, location, comment, flag]] 과 같은 형태로 저장해두었음.

  const url = `/Trail?user_id=${user_id}&trail_id=${trail_id}`;

  const getTrailData = () => {
    const formData = new FormData();
    formData.append('user_id', user_id);
    formData.append('trail_id', trail_id);
    formData.append('postFlag', 'getTrailData');

    return axios.post(url, formData);
  };
  useEffect(() => {
    const handleFormSubmit = (e) => {
      getTrailData({})
        .then((response) => {
          setTrails(response.data);
          if (Trails.length > 0) {
            setFlag(Trails[3]); // flag 설정
          }
        })
        .catch((error) => {
          console.error(error);
        });
    };

    handleFormSubmit(); // 함수 호출 추가
  }, [Trails[3]]);

  const handleButtonSubmit = (e) => {
    e.preventDefault();
    if (action === 'comment') {
      addComments()
        .then((response) => {
          console.log(response.data);
          window.location.href = `/Trail?user_id=${user_id}&trail_id=${trail_id}`;
        })
        .catch((error) => {
          console.error(error);
        });
    } else if (action === 'favorite') {
      // 여기다가 favorite 동작. 1일때와 0일때 구분지어서 동작시켜야함.
      addFavorite()
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const addComments = () => {
    const formData = new FormData();
    formData.append('postFlag', 'addComments');
    formData.append('comment', comment);
    formData.append('user_id', user_id);
    formData.append('trail_id', trail_id);

    return axios.post(url, formData);
  };
  const addFavorite = () => {
    const formData = new FormData();

    formData.append('user_id', user_id);
    formData.append('trail_id', trail_id);
    formData.append('postFlag', 'addFavorite');

    formData.append('flag', flag);
    if (flag === 1) {
      // 여기서는 1이 favorite를 추가하는 동작.
      formData.append('latitude', Trails[1][0]);
      formData.append('longitude', Trails[1][1]);
    } else {
      // 삭제.
    }

    return axios.post(url, formData);
  };
  return (
    <form onSubmit={handleButtonSubmit}>
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
                    <button
                      className={`FavoriteButton ${flag === 0 ? 'black' : 'green'}`}
                      type="submit"
                      onClick={() => {
                        setAction('favorite');
                        if (flag === 0) {
                          setFlag(1);
                        } else {
                          setFlag(0);
                        }
                      }}
                    >
                      <BsBookmarkStar className="FavoriteImg" />
                    </button>
                  </div>
                </div>
                <div className="ScrollBox">
                  <div className="TrailReview">{Trails[0][4].length != 0 ? Trails[0][4] : '사용자 후기가 존재하지 않습니다.'}</div>
                  <div className="TrailFacilities">
                    <div className="TrailFacilitiesHead">편의시설</div>
                    <div className="TrailFacilitiesBody">{Trails[0][5].length != 0 ? Trails[0][5] : '편의시설 정보가 존재하지 않습니다.'}</div>
                  </div>
                  <div className="CommentBox">
                    <div className="ShowComments">
                      <div className="ShowCommentsBody">
                        <CommentList comments={Trails[2]} />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="AddComment">
                  <div className="UserImg">
                    <AiOutlineUser className="UserImgFile" />
                  </div>
                  <input
                    className="AddCommentTextBox"
                    type="text"
                    placeholder="댓글을 남겨주세요!"
                    name="CommentText"
                    value={comment}
                    onChange={(e) => {
                      setComment(e.target.value);
                    }}
                  />
                  <div className="AddCommentButtonBox">
                    <button
                      className="AddCommentButton"
                      type="submit"
                      onClick={() => {
                        setAction('comment');
                      }}
                    >
                      <RiMailAddLine className="CommentButtonImg" />
                    </button>
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
