const { Network, Alchemy } = require("alchemy-sdk");
const dotenv = require("dotenv");

dotenv.config();

// Optional config object, but defaults to demo api-key and eth-mainnet.
const settings = {
  apiKey: process.env.ALCHEMY_API_KEY,
  network: Network.ETH_GOERLI,
};
const alchemy = new Alchemy(settings);

alchemy.core
  .getTransactionReceipt(
    "0xc9757327c09bb87115d7c02ad21844eb12e4f1cb91ced31c4e4438ec049b536c" // Transaction hash of the transaction for which you want to get information.
  )
  .then(console.log);