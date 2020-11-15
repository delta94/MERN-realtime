import React from 'react';
import CommentCard from './CommentCard';

const CommentItem = ({ comment, socket }) => {
  return (
    <>
      <CommentCard comment={comment}>
        <div className="nav_comment">
          <p>Reply</p>
          <p>Load more comments</p>
          <p>Hide Reply</p>
        </div>
      </CommentCard>
    </>
  );
};

export default CommentItem;
