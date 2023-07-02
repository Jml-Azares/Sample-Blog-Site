import React from "react";

const BlogPost = ({ post, onClick, onEdit }) => {
  const handlePostClick = () => {
    onClick(post);
  };

  return (
    <div
      className="blog-post border-bottom mb-5 pb-5"
      onClick={handlePostClick}
      style={{ cursor: "pointer" }}
    >
      <div className="post-header">
        <h2>{post.title}</h2>
      </div>
      <p>
        By {post.author} on {post.date}
      </p>
      {/* <p>{post.content}</p> */}
    </div>
  );
};

export default BlogPost;
