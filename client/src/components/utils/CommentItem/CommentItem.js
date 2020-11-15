import React from 'react';
import CommentCard from './CommentCard';

const CommentItem = ({ comment }) => {
  return (
    <>
      <CommentCard comment={comment} />
    </>
  );
};

export default CommentItem;
