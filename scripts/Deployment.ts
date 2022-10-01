import { ethers } from "hardhat";

(async () => {
  const PROPOSALS = ["Group 1", "Group 6", "Group 3"]
  const propBytes = PROPOSALS.map(el => ethers.utils.formatBytes32String(el))
  const [deployer] = await ethers.getSigners();
  
  console.log("Deploying contracts with the account: ", deployer.address);

  const Ballot = await ethers.getContractFactory("Ballot");
  const ballot = await Ballot.deploy(propBytes);

  console.log("Ballot contract address:", ballot.address);
})()