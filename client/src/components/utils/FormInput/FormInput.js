import React, { useEffect, useRef } from 'react';
import { patchData } from '../FetchData';
import './FormInput.css';

const FormInput = ({ id, socket, rating }) => {
  const nameRef = useRef();
  const contentRef = useRef();

  const commentSubmit = () => {
    const username = nameRef.current.value;
    const content = contentRef.current.innerHTML;

    if (!username.trim()) return alert('Not Empty');
    if (contentRef.current.textContent.trim().length < 20)
      return alert('Contents too short, must be at least 20 characters');

    const createdAt = new Date().toISOString();

    socket.emit('createComment', {
      username,
      content,
      product_id: id,
      createdAt,
      rating,
    });

    if (rating && rating !== 0) {
      patchData(`/api/product/${id}`, { rating });
    }

    contentRef.current.innerHTML = '';
  };

  return (
    <div className="form_input">
      <p>Name</p>
      <input type="text" ref={nameRef} />

      <p>Content</p>
      <div
        ref={contentRef}
        contentEditable="true"
        style={{
          height: '100px',
          border: '1px solid #ccc',
          padding: '5px 10px',
          outline: 'none',
        }}
      />

      <button onClick={commentSubmit}>Send</button>
    </div>
  );
};

export default FormInput;
