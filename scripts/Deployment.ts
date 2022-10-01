import { ethers } from "hardhat";
import { Ballot } from "../typechain-types";

(async () => {
  // proposals. On which are you gonna vote?
  const PROPOSALS = ["Group 1", "Group 6", "Group 3"];

  // list of voters (group 6 members only)
  const voters = [
    "0x1BfE27367178FcFa8BE2784387F10FCBFf0D6456",
    "0x6EaCc549C6378CA0506452899a1210060Ee71C20",
    "0x963625ac45cC696Ad5Fe467Ebf4d62C9542b7726",
    "0xA89a06aDe3B2Cb55971D9240f11E39bc615b7049",
  ];
  const propBytes = PROPOSALS.map((el) => ethers.utils.formatBytes32String(el));
  const [chairPerson] = await ethers.getSigners();

  console.log("Deploying contracts with the account: ", chairPerson.address);

  // contract deployment
  const Ballot = await ethers.getContractFactory("Ballot");
  const ballot = await Ballot.deploy(propBytes);
  const deployed: Ballot = await ballot.deployed();

  console.log("Ballot contract address:", ballot.address);

  // Give voter rights
  voters.map(async (voter) => {
    await deployed.giveRightToVote(voter);
  });

  // check voters rights
  voters.map(async (voter) => {
    const contractVoter = await deployed.voters(voter);
    console.log(
      `Voter ${voter} has the following weight: `,
      contractVoter.weight.toNumber()
    );
  });

  // check chairPerson voters rights
  const chairPersonVoter = await deployed.voters(chairPerson.address);
  console.log(
    `ChairPerson ${chairPerson.address} has the following weight: `,
    chairPersonVoter.weight.toNumber()
  );

  // try to give chairPerson voting rights
  // will fail due to "require" at line 70 in Ballot.sol
  // comment the following line to avoid program crash
  // await deployed.giveRightToVote(chairPerson.address);

  // casting votes
  // INPUT YOUR CODE HERE TO CAST YOUR VOTE
  // Hint: use voters.vote function
  await deployed.vote(1);

  // delegating votes
  // will fail with reason 'you already voted' because voter is the chairPerson, and he voted on line 56
  // comment the following line to avoid program crash
  // await deployed.delegate(voters[0]);

  // querying results
  const finalResult = await deployed.winnerName();
  const resultStr = ethers.utils.parseBytes32String(finalResult);
  console.log(`And the winner is .... the proposal "${resultStr}"!`);
})();
