import React from 'react';
import { AiOutlineUser } from 'react-icons/ai';
import './Comment.css';
function Comment({ user_id, comment }) {
  return (
    <div className="user_comment">
      <div className="Comment_Id">
        <AiOutlineUser className="Comment_Id_UserImage" />
        <span className="Comment_user-id">{user_id}</span>
      </div>
      <div className="Comment_Body">
        <span className="Comment_comment">{comment}</span>
      </div>
    </div>
  );
}

export default Comment;
