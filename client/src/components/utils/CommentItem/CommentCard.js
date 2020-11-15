import React from 'react';
import moment from 'moment';

import Rating from '../Rating/Rating';

const CommentCard = ({ children, comment }) => {
  console.log('date', comment);
  const { createdAt, rating, content, username } = comment;
  return (
    <div className="comment_card">
      <div className="comment_card_row">
        <h3>{username}</h3>
        {rating !== 0 && <Rating props={comment} />}
      </div>

      <span>{new Date(createdAt).toLocaleString()}</span>
      <span>{moment(createdAt).fromNow()}</span>

      <p dangerouslySetInnerHTML={{ __html: content }} />

      {children}
    </div>
  );
};

export default CommentCard;
