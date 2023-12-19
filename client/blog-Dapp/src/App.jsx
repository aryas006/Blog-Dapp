import abi from "./context/Blog.json";
import "./App.css";
import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import ContractViewer from "./components/Blogs";
import CreatePost from "./components/createPost";

const App = () => {
  return (
    <div>
      <ContractViewer />
      <CreatePost />
    </div>
  );
};

export default App;
