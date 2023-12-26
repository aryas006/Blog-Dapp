import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { contractAddress, contractABI } from "./utils/constants"; // Adjust the path to your contract JSON
import CreatePost from "./components/createPost";
import ContractViewer from "./components/Blogs";

const App = () => {
  const [contract, setContract] = useState(null);

  useEffect(() => {
    const init = async () => {
      // Connect to the blockchain and get the contract instance
      if (window.ethereum) {
        try {
          await window.ethereum.request({ method: "eth_requestAccounts" });
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const signer = provider.getSigner();
          const contractInstance = new ethers.Contract(
            contractAddress, // Replace with your contract address
            contractABI,
            signer
          );
          setContract(contractInstance);
        } catch (error) {
          console.error("Error connecting to the blockchain:", error);
        }
      } else {
        alert(
          "MetaMask not found. Please install MetaMask to use this application."
        );
      }
    };

    init();
  }, []);

  return (
    <div>
      <center>
        <h1>Decentralized Blog App</h1>
      </center>
      {contract && <CreatePost contract={contract} />}
      {/* Add other components or UI elements as needed */}
      {contract && <ContractViewer contract={contract} />}
    </div>
  );
};

export default App;
