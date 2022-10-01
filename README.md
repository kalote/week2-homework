# Ballot hardhat project

## Install

```bash
cp .env.example .env # create a free infura account + get your test wallet private key & update the .env file
npm i
yarn hardhat run scripts/Deployment.ts --network goerli # run deployment file on Goerli Testnet
yarn hardhat run scripts/Deployment.ts # run deployment file locally
```