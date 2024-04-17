"use client";
import { useState } from "react";

interface Comment {
  name: string;
  comment: string;
  createdAt: string;
}

interface Props {
  onSubmit: (comment: Comment) => void;
}

const CommentForm: React.FC<Props> = ({ onSubmit }) => {
  const [name, setName] = useState<string>("");
  const [comment, setComment] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() !== "" && comment.trim() !== "") {
      const currentDate = new Date().toLocaleString();
      onSubmit({ name, comment, createdAt: currentDate });
      setName("");
      setComment("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <input
          type="text"
          className="w-full border border-gray-300 rounded-md p-2 mb-2"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your Name"
        />
        <textarea
          className="w-full border border-gray-300 rounded-md p-2"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write your comment here..."
          rows={4}
        ></textarea>
      </div>

      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
      >
        Post Comment
      </button>
    </form>
  );
};

export default CommentForm;
