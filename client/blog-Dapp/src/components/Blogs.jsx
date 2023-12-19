import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import abi from "../context/Blog.json";
import "../App.css";

const ContractViewer = () => {
  const [postsCount, setPostsCount] = useState(0);
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
            process.env.CONTRACT_ADDRESS,
            abi.abi,
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

  const fetchPostsCount = async () => {
    if (!contract) return;

    try {
      // Call the smart contract function to get the total count of posts
      const count = await contract.getAllPostsCount();
      setPostsCount(count.toNumber());
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (contract) {
      fetchPostsCount();
    }
  }, [contract]);

  return (
    <div className="container">
      <div className="postCountCard">
        {/* Display the posts count */}
        <strong>Total Posts:</strong> {postsCount}
      </div>
    </div>
  );
};

export default ContractViewer;
