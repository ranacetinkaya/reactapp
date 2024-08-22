// Components/Comments.js
import React, { useEffect, useState } from 'react';

const Comments = ({ postId }) => {
  const [comment, setComment] = useState(null);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/posts/1/comments`)
      .then((response) => response.json())
      .then((data) => setComment(data[0]))  // Sadece ilk yorumu alıyoruz
      .catch((error) => console.log('Error fetching comments:', error));
  }, [postId]);

  if (!comment) {
    return <p>Loading comment...</p>;
  }

  return (
    <div className="comment">
      <h4>Comment:</h4>
      <p><strong>{comment.name}:</strong> {comment.body}</p>
      <p>Email: {comment.email}</p>
    </div>
  );
};

export default Comments;
