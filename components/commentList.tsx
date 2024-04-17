// CommentsList.tsx

import React from 'react';

interface Comment {
  name: string;
  comment: string;
  createdAt: string;
}

interface Props {
  comments: Comment[];
}

const CommentsList: React.FC<Props> = ({ comments }) => {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Older Comments</h2>
      {comments.map((comment, index) => (
        <div key={index} className="bg-gray-100 p-4 my-2 rounded-md">
          <p className="text-gray-600 mb-2">Name: {comment.name}</p>
          <p className="text-gray-600 mb-2">Posted At: {comment.createdAt}</p>
          <p>{comment.comment}</p>
        </div>
      ))}
    </div>
  );
};

export default CommentsList;
