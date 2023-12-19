const hre = require("hardhat");

async function main() {
  const Blog = await hre.ethers.getContractFactory("Blog");
  console.log("Deploying contract...");
  const blog = await Blog.deploy();
  console.log("Waiting for contract to deployed...");
  console.log("Contract address");
  console.log(blog.target);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
