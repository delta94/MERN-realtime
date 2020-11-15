import React, { useState, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { DataContext } from '../../../GlobalState';
import DetailProductCard from '../../utils/DetailProductCard/DetailProductCard';
import { getData } from '../../utils/FetchData';
import FormInput from '../../utils/FormInput/FormInput';
import CommentItem from '../../utils/CommentItem/CommentItem';
import './DetailProduct.css';

const DetailProduct = () => {
  const { id } = useParams();

  const state = useContext(DataContext);
  const [products] = state.products;
  const socket = state.socket;

  const [detailProduct, setDetailProduct] = useState([]);
  const [rating, setRating] = useState(0);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setDetailProduct(products.filter((product) => product._id === id));
  }, [id, products]);

  useState(() => {
    setLoading(true);
    getData(`/api/comments/${id}`)
      .then((res) => {
        setComments(res.data.comments);
        setLoading(false);
      })
      .catch((err) => console.log(err.response.data.msg));
  }, [id]);

  return (
    <div className="detail_product_page">
      {detailProduct.map((product) => (
        <DetailProductCard key={product._id} product={product} />
      ))}

      <div className="comments">
        <h2 className="app_title">
          Realtime website ( chat, comments, ... ) with MERN Stack and Socket.io
        </h2>

        <div className="reviews">
          <input
            type="radio"
            name="rate"
            id="rd-5"
            onChange={() => setRating(5)}
          />
          <label htmlFor="rd-5" className="fas fa-star"></label>

          <input
            type="radio"
            name="rate"
            id="rd-4"
            onChange={() => setRating(4)}
          />
          <label htmlFor="rd-4" className="fas fa-star"></label>

          <input
            type="radio"
            name="rate"
            id="rd-3"
            onChange={() => setRating(3)}
          />
          <label htmlFor="rd-3" className="fas fa-star"></label>

          <input
            type="radio"
            name="rate"
            id="rd-2"
            onChange={() => setRating(2)}
          />
          <label htmlFor="rd-2" className="fas fa-star"></label>

          <input
            type="radio"
            name="rate"
            id="rd-1"
            onChange={() => setRating(1)}
          />
          <label htmlFor="rd-1" className="fas fa-star"></label>
        </div>

        <FormInput id={id} socket={socket} rating={rating} />

        <div className="comments_list">
          {comments.map((comment) => (
            <CommentItem key={comment._id} comment={comment} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DetailProduct;
