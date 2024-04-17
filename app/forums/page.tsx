"use client";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Post {
  id?: Number;
  title: string;
  details: string;
  createdAt: string;
  postedBy: string;
}

const Forum: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [newPost, setNewPost] = useState<Post>({
    title: "",
    details: "",
    createdAt: "",
    postedBy: "",
  });

  const handlePostSubmit = async () => {
    if (
      newPost.title.trim() !== "" &&
      newPost.details.trim() !== "" &&
      newPost.postedBy.trim() !== ""
    ) {
      const currentDate = new Date().toLocaleString();
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/forums`,
          { ...newPost, createdAt: currentDate }
        );
        setNewPost({
          title: "",
          details: "",
          createdAt: "",
          postedBy: "",
        });
      } catch (error) {
        console.log("====================================");
        console.log(error);
        console.log("====================================");
      }
    }
  };

  const getPosts = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/forums`
      );
      if (response.data.length) {
        setPosts(response.data);
      }
    } catch (error) {
      console.log("====================================");
      console.log(error);
      console.log("====================================");
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div className="container mx-auto px-4 py-9">
      <h1 className="text-3xl font-bold mb-4">Forum</h1>

      <div className="mb-4">
        <input
          type="text"
          className="w-full border border-gray-300 rounded-md p-2 mb-2"
          value={newPost.title}
          onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
          placeholder="Title"
        />
        <textarea
          className="w-full border border-gray-300 rounded-md p-2"
          value={newPost.details}
          onChange={(e) => setNewPost({ ...newPost, details: e.target.value })}
          placeholder="Write your post details here..."
          rows={4}
        ></textarea>
        <input
          type="text"
          className="w-full border border-gray-300 rounded-md p-2 mt-2"
          value={newPost.postedBy}
          onChange={(e) => setNewPost({ ...newPost, postedBy: e.target.value })}
          placeholder="Posted By"
        />
      </div>

      <button
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        onClick={handlePostSubmit}
      >
        Post
      </button>

      <div className="mt-8">
        {posts.map((post, index) => (
          <Link key={index} href={`/forums/${post.id}`}>
            <div className="bg-gray-100 p-4 my-2 rounded-md">
              <h2 className="text-xl font-bold mb-2">{post.title}</h2>
              <p className="text-gray-600 mb-2">Posted By: {post.postedBy}</p>
              <p className="text-gray-600 mb-2">Posted At: {post.createdAt}</p>
              <p>{post.details}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Forum;
