import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { TbMapSearch } from 'react-icons/tb';
import { IoIosAddCircleOutline } from 'react-icons/io';
import { BsBookmarkStar } from 'react-icons/bs';
import { RxExit } from 'react-icons/rx';
function List() {
  // 목록 데이터
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const user_id = searchParams.get('user_id');

  return (
    <div className="MainList">
      <hr />
      <div className="List">산책로 목록</div>
      <hr className="ListBorder" />
      <div className="item1">
        <Link className="item1Link" type="button">
          <button className="item1Button">
            <TbMapSearch className="item1Image" />
            <span className="item1Span">산책로 조회</span>
          </button>
        </Link>
      </div>

      <div className="item2">
        <Link className="item2Link" Link to={`/Add?user_id=${user_id}`} type="button">
          <button className="item2Button">
            <IoIosAddCircleOutline className="item2Image" />
            <span className="item2Span">산책로 추가</span>
          </button>
        </Link>
      </div>

      <div className="item3">
        <Link className="item3Link" type="button">
          <button className="item3Button">
            <BsBookmarkStar className="item3Image" />
            <span className="item3Span">즐겨찾기</span>
          </button>
        </Link>
      </div>

      <div className="item4">
        <Link className="item4Link" type="button" Link to={`/`}>
          <button className="item4Button">
            <RxExit className="item4Image" />
            <span className="item4Span">종료</span>
          </button>
        </Link>
      </div>
    </div>
  );
}

export default List;
