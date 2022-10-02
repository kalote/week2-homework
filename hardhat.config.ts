import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import { config as LoadEnv } from 'dotenv';

LoadEnv();

// Replace this private key with your Goerli account private key
// To export your private key from Metamask, open Metamask and
// go to Account Details > Export Private Key
// Beware: NEVER put real Ether into testing accounts
const GOERLI_PRIVATE_KEY = process.env.GOERLI_PRIVATE_KEY as string;

// Go to https://infura.io, sign up, create
// a new App in its dashboard, and get the key
const INFURA_PROJECT_ID = process.env.INFURA_PROJECT_ID;

const config: HardhatUserConfig = {
    solidity: "0.8.17",
    paths: { tests: "tests" },
    networks: {
        goerli: {
            url: `https://goerli.infura.io/v3/${INFURA_PROJECT_ID}`,
            accounts: [GOERLI_PRIVATE_KEY]
        }
    }
};

export default config;
