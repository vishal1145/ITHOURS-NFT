require('dotenv').config();
require("@nomiclabs/hardhat-ethers");
// const { API_URL, METAMASK_PRIVATE_KEY } = process.env;
// console.log("process.env.API_URL", process.env.API_URL);
module.exports = {
   solidity: "0.8.9",
   defaultNetwork: "goerli",
   networks: {
      hardhat: {},
      goerli: {
         url: process.env.API_URL,
         accounts: [`0x${process.env.METAMASK_PRIVATE_KEY}`]
      }
   },
}