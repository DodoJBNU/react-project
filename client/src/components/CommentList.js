import React from 'react';
import Comment from './Comment';

function CommentList({ comments }) {
  return (
    <div className="comment-list">
      {comments.map((com) => (
        <Comment user_id={com[1]} comment={com[3]} />
      ))}
    </div>
  );
}

export default CommentList;
