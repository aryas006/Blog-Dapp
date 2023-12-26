import React, { useState } from "react";
import { ethers } from "ethers";
import "../App.css";

const CreatePost = ({ contract }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleCreatePost = async () => {
    try {
      // Call the createPost function on the smart contract
      await contract.createPost(title, content);
      // You may want to update the UI or show a success message
      console.log("Post created successfully!");
      // Clear the input fields after successful creation
      setTitle("");
      setContent("");
    } catch (error) {
      console.error("Error creating post:", error);
      // Handle the error, show an error message, etc.
    }
  };

  return (
    <div className="main">
      <div className="createPost">
        <h2>Create a New Blog Post</h2>
        <label>Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label>Content:</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button className="btn" onClick={handleCreatePost}>
          Create Post
        </button>
      </div>
    </div>
  );
};

export default CreatePost;
