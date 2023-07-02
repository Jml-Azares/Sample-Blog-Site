import "./App.css";
import Header from "./header";
import Footer from "./footer";
import BlogPost from "./blogpost";
import NoContent from "./nocontent";
import React, { useState } from "react";

function App() {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editedPost, setEditedPost] = useState(null);
  const [dateFilter, setDateFilter] = useState("");

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const title = e.target.elements.title.value;
    const author = e.target.elements.author.value;
    const date = e.target.elements.date.value;
    const content = e.target.elements.content.value;

    const newPost = {
      title,
      author,
      date,
      content,
    };

    setPosts([...posts, newPost]);

    e.target.reset();
  };

  const handlePostClick = (post) => {
    setSelectedPost(post);
    setEditMode(false);
    scrollToTop();
  };

  const handleClosePopup = () => {
    setSelectedPost(null);
    setEditMode(false);
  };

  const handleEditPost = (post) => {
    setSelectedPost(post);
    setEditedPost({ ...post });
    setEditMode(true);
    scrollToTop();
  };

  const handleSavePost = () => {
    const updatedPosts = posts.map((post) =>
      post === selectedPost ? editedPost : post
    );
    setPosts(updatedPosts);

    setSelectedPost(null);
    setEditMode(false);
    setEditedPost(null);
  };

  const handleDeletePost = (post) => {
    const updatedPosts = posts.filter((p) => p !== post);
    setPosts(updatedPosts);

    if (selectedPost === post) {
      setSelectedPost(null);
      setEditMode(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedPost((prevPost) => ({
      ...prevPost,
      [name]: value,
    }));
  };

  const handleFilterChange = (e) => {
    setDateFilter(e.target.value);
  };

  const filteredPosts = dateFilter
    ? posts.filter((post) => post.date === dateFilter)
    : posts;

  const textAreaHeight = {
    height: "500px",
    resize: "none",
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <Header />
      <div className="container-fluid py-5 blog text-center">
        <form onSubmit={handleFormSubmit}>
          <div className="mb-3 w-25 text-center mx-auto">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input className="form-control" type="text" name="title" required />
          </div>
          <div className="mb-3 w-25 text-center mx-auto">
            <label htmlFor="author" className="form-label">
              Author
            </label>
            <input
              className="form-control"
              type="text"
              name="author"
              required
            />
          </div>
          <div className="mb-3 w-25 text-center mx-auto">
            <label htmlFor="date" className="form-label">
              Date
            </label>
            <input className="form-control" type="date" name="date" required />
          </div>
          <div className="mb-3 w-75 mx-auto text-center">
            <label htmlFor="content" className="form-label">
              Content
            </label>
            <textarea
              className="form-control"
              name="content"
              required
              style={textAreaHeight}
            ></textarea>
          </div>
          <button className="btn btn-dark" type="submit">
            Submit
          </button>
        </form>
      </div>
      <div className="px-5 mb-5">
        <div className="filter mb-5 text-center w-25 mx-auto">
          <label htmlFor="filterDate" className="form-label">
            Filter by Date
          </label>
          <input
            className="form-control"
            type="date"
            id="filterDate"
            value={dateFilter}
            onChange={handleFilterChange}
          />
        </div>
        <div className="blog-posts">
          {filteredPosts.length === 0 ? (
            <NoContent />
          ) : (
            filteredPosts.map((post, index) => (
              <BlogPost
                key={index}
                post={post}
                onClick={handlePostClick}
                onEdit={handleEditPost}
                onDelete={handleDeletePost}
              />
            ))
          )}
        </div>
      </div>
      {selectedPost && (
        <div className="post-popup">
          <div className={`post-popup-content ${editMode ? "edit-mode" : ""}`}>
            {editMode ? (
              <>
                <h2>Edit Post</h2>
                <input
                  type="text"
                  name="title"
                  value={editedPost.title}
                  onChange={handleInputChange}
                  className="form-control mb-2"
                  required
                />
                <input
                  type="text"
                  name="author"
                  value={editedPost.author}
                  onChange={handleInputChange}
                  className="form-control mb-2"
                  required
                />
                <input
                  type="date"
                  name="date"
                  value={editedPost.date}
                  onChange={handleInputChange}
                  className="form-control mb-2"
                  required
                />
                <textarea
                  name="content"
                  value={editedPost.content}
                  onChange={handleInputChange}
                  className="form-control mb-2"
                  style={textAreaHeight}
                  required
                ></textarea>
                <button className="btn btn-primary" onClick={handleSavePost}>
                  Save
                </button>
                <button
                  className="btn btn-danger ml-2"
                  onClick={handleClosePopup}
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <h2>{selectedPost.title}</h2>
                <p>
                  By {selectedPost.author} on {selectedPost.date}
                </p>
                <p>{selectedPost.content}</p>
                <button
                  className="btn btn-primary"
                  onClick={() => handleEditPost(selectedPost)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger ml-2"
                  onClick={() => handleDeletePost(selectedPost)}
                >
                  Delete
                </button>
                <button
                  className="btn btn-dark ml-2"
                  onClick={handleClosePopup}
                >
                  Close
                </button>
              </>
            )}
          </div>
        </div>
      )}
      <Footer />
    </>
  );
}

export default App;
