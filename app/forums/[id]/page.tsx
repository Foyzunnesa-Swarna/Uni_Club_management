"use client";
import CommentForm from "@/components/commentForm";
import CommentsList from "@/components/commentList";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface Post {
  id?: number;
  title: string;
  details: string;
  createdAt: string;
  postedBy: string;
}

interface Comment {
  id?: number;
  name: string;
  comment: string;
  createdAt: string;
}

const PostPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [post, setPost] = useState<Post>();

  const [comments, setComments] = useState<Comment[]>([]);

  const addComment = async (postId: number, comment: Comment) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/forums/${postId}/comments`,
        comment
      );
    } catch (error) {
      console.log("====================================");
      console.log(error);
      console.log("====================================");
    }
  };

  const getComments = async (postId: number) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/forums/${postId}/comments`
      );
      if (response.data.length) {
        setComments(response.data);
      }
    } catch (error) {
      console.log("====================================");
      console.log(error);
      console.log("====================================");
    }
  };

  const getPost = async (postId: number) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/forums/${postId}`
      );
      if (response.data) {
        setPost(response.data);
        getComments(postId);
      }
    } catch (error) {
      console.log("====================================");
      console.log(error);
      console.log("====================================");
    }
  };

  useEffect(() => {
    getPost(Number(id));
  }, []);

  if (!post) {
    return <div>Post not found.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-gray-100 p-4 my-2 rounded-md">
        <h2 className="text-xl font-bold mb-2">{post.title}</h2>
        <p className="text-gray-600 mb-2">Posted By: {post.postedBy}</p>
        <p className="text-gray-600 mb-2">Posted At: {post.createdAt}</p>
        <p>{post.details}</p>
      </div>

      <CommentForm onSubmit={(data) => addComment(Number(id), data)} />

      <CommentsList comments={comments} />
    </div>
  );
};

export default PostPage;
