import { ethers } from "ethers";
import * as dotenv from "dotenv";
import { Ballot__factory } from "../typechain-types";
import { task } from "hardhat/config";


dotenv.config(); //Read .env file
const INFURA_API_KEY = process.env.INFURA_PROJECT_ID;
const GOERLI_PRIVATE_KEY = process.env.GOERLI_PRIVATE_KEY;

/*
  vote for a ballot 
  @param contractAddress : use address of the Ballot contract in Goerli
  @param proposal: selected proposal 
*/
task("vote", "Vote in a ballot")
  .addPositionalParam("contractAddress")
  .addPositionalParam("proposal")
  .setAction(async (taskArgs) => {
    console.log(taskArgs);

    if ([0,1,2].indexOf(parseInt(taskArgs.proposal)) == -1) { //the only allowed values for proposal
      throw new Error(
        "Allowed value for proposal is 0, 1 or 2"
      );
    }

    const network = "goerli";
    const options = {
        infura: process.env.INFURA_PROJECT_ID
    };
    const provider = ethers.getDefaultProvider(network, options);
    const account = new ethers.Wallet(GOERLI_PRIVATE_KEY);
    const signer = account.connect(provider);
    const balance = ethers.utils.formatEther(await signer.getBalance());
    console.log(`account address: ${account.address}, balance: ${balance} ETH`);

    const ballot = new Ballot__factory(signer).attach(taskArgs.contractAddress);
    const tx = await ballot.vote(taskArgs.proposal);
    console.log({tx: tx});

    const receipt = await tx.wait();
    console.log({receipt: receipt});
  });