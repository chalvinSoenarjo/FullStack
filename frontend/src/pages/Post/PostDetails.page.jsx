import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import DOMAIN from "../../services/endpoint";
import { truncateEmail } from "./utils";

function PostDetailsPage() {
  const { postId } = useParams();
  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState(null);

  const fetchPostDetails = async () => {
    try {
      const response = await axios.get(`${DOMAIN}/api/posts/${postId}`);
      console.log("Response from API:", response.data); // Debugging statement
      setPost(response.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPostDetails();
  }, []); // Empty dependency array to run the effect only once

  if (loading) {
    return <p>Loading post details...</p>;
  }

  if (!post) {
    return <p>Post not found.</p>;
  }

  const authorName = truncateEmail(post.author);

  return (
    <>
      <h2>{post.title}</h2>
      <p>Author: {authorName}</p>
      <p>Category: {post.category}</p>
      <p>{post.content}</p>
      <img src={post.image} alt="Post" />
    </>
  );
}

export const postDetailsLoader = async ({ params }) => {
  const response = await axios.get(`${DOMAIN}/api/posts/${params.postId}`);
  return response.data;
};

export default PostDetailsPage;
