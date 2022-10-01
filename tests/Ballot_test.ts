import { expect } from "chai";
import { ethers } from "hardhat";
import { Ballot } from "../typechain-types"

const PROPOSALS = ["Proposal 1", "Proposal 2", "Proposal 3"];

describe("Ballot", function () {
  let ballotContract: Ballot;

  beforeEach(async function () {
    const ballotFactory = await ethers.getContractFactory("Ballot");
    const propBytes = PROPOSALS.map(el => ethers.utils.formatBytes32String(el))
    ballotContract = await ballotFactory.deploy(propBytes);
    await ballotContract.deployed();
  });

  describe("when the contract is deployed", function () {
    it("has the provided proposals", async function () {
      for (let index = 0; index < PROPOSALS.length; index++) {
        const proposal = await ballotContract.proposals(index);
        expect(ethers.utils.parseBytes32String(proposal.name)).to.eq(
          PROPOSALS[index]
        );
      }
    });

    // it("has zero votes for all proposals", async function () {
    //   // TODO
    //   throw Error("Not implemented");
    // });
    // it("sets the deployer address as chairperson", async function () {
    //   // TODO
    //   throw Error("Not implemented");
    // });
    // it("sets the voting weight for the chairperson as 1", async function () {
    //   // TODO
    //   throw Error("Not implemented");
    // });
  });

  // describe("when the chairperson interacts with the giveRightToVote function in the contract", function () {
  //   it("gives right to vote for another address", async function () {
  //     // TODO
  //     throw Error("Not implemented");
  //   });
  //   it("can not give right to vote for someone that has voted", async function () {
  //     // TODO
  //     throw Error("Not implemented");
  //   });
  //   it("can not give right to vote for someone that has already voting rights", async function () {
  //     // TODO
  //     throw Error("Not implemented");
  //   });
  // });

  // describe("when the voter interact with the vote function in the contract", function () {
  //     // TODO
  //     throw Error("Not implemented");
  // });

  // describe("when the voter interact with the delegate function in the contract", function () {
  //     // TODO
  //     throw Error("Not implemented");
  // });

  // describe("when the an attacker interact with the giveRightToVote function in the contract", function () {
  //     // TODO
  //     throw Error("Not implemented");
  // });

  // describe("when the an attacker interact with the vote function in the contract", function () {
  //     // TODO
  //     throw Error("Not implemented");
  // });

  // describe("when the an attacker interact with the delegate function in the contract", function () {
  //     // TODO
  //     throw Error("Not implemented");
  // });

  // describe("when someone interact with the winningProposal function before any votes are cast", function () {
  //     // TODO
  //     throw Error("Not implemented");
  // });

  // describe("when someone interact with the winningProposal function after one vote is cast for the first proposal", function () {
  //     // TODO
  //     throw Error("Not implemented");
  // });

  // describe("when someone interact with the winnerName function before any votes are cast", function () {
  //     // TODO
  //     throw Error("Not implemented");
  // });

  // describe("when someone interact with the winnerName function after one vote is cast for the first proposal", function () {
  //     // TODO
  //     throw Error("Not implemented");
  // });

  // describe("when someone interact with the winningProposal function and winnerName after 5 random votes are cast for the proposals", function () {
  //     // TODO
  //     throw Error("Not implemented");
  // });
});