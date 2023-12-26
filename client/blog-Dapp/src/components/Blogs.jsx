import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { contractAddress, contractABI } from "../utils/constants";
import "../App.css";

const ContractViewer = () => {
  const [posts, setPosts] = useState([]);
  const [contract, setContract] = useState(null);

  useEffect(() => {
    const init = async () => {
      // Check if MetaMask is installed and connected
      if (window.ethereum) {
        try {
          // Request account access if needed
          await window.ethereum.request({ method: "eth_requestAccounts" });

          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const signer = provider.getSigner();

          // Replace with your smart contract address and ABI
          const contractInstance = new ethers.Contract(
            contractAddress, // Replace with your contract address
            contractABI,
            signer
          );

          setContract(contractInstance);
        } catch (error) {
          console.error(error);
        }
      } else {
        alert(
          "MetaMask not found. Please install MetaMask to use this application."
        );
      }
    };

    init();
  }, []);

  const fetchPosts = async () => {
    if (!contract) return;

    try {
      // Call the smart contract function to get all posts
      const postCount = await contract.viewPostsCount();
      const newPosts = [];

      for (let i = 1; i <= postCount; i++) {
        const post = await contract.getPost(i);
        newPosts.push(post);
      }

      setPosts(newPosts);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (contract) {
      fetchPosts();
    }
  }, [contract]);

  return (
    <div className="container">
      {posts.map((post, index) => (
        <div key={index} className="postCard">
          <h2>{post.title}</h2>
          <p>
            <strong>Content:</strong> {post.content}
          </p>
          <p>
            <strong>Author:</strong> {post.author}
          </p>
        </div>
      ))}
    </div>
  );
};

export default ContractViewer;
