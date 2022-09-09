require('dotenv').config();
const API_URL = process.env.API_URL;
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const alchemyWeb3 = createAlchemyWeb3(API_URL);
const contract = require("../artifacts/contracts/ithoursNFT.sol/ITHOURS.json");
const contractAddress = "0x67b319A9D5cB90Bc6A84adC258A99d1D4ef11E7D";
const nftContract = new alchemyWeb3.eth.Contract(contract.abi, contractAddress);

const METAMASK_PUBLIC_KEY = process.env.METAMASK_PUBLIC_KEY;
const METAMASK_PRIVATE_KEY = process.env.METAMASK_PRIVATE_KEY;

// async function mintNFT(tokenURI) {
// get the nonce - nonce is needed for security reasons. It keeps track of the number of
// transactions sent from our address and prevents replay attacks.
const nonce = alchemyWeb3.eth.getTransactionCount(METAMASK_PUBLIC_KEY, 'latest');
const tx = {
    from: METAMASK_PUBLIC_KEY, // our MetaMask public key
    to: contractAddress, // the smart contract address we want to interact with
    nonce: nonce, // nonce with the no of transactions from our account
    gas: 1000000, // fee estimate to complete the transaction
    data: nftContract.methods
        .safeMint("0x1D462Ce7F322DCD0566ac855A7B680560a908254", process.env.TOKEN_URI)
        .encodeABI(), // call the createNFT function from our OsunRiverNFT.sol file and pass the account that should receive the minted NFT.
};
// }

const signPromise = alchemyWeb3.eth.accounts.signTransaction(
    tx,
    METAMASK_PRIVATE_KEY
);
signPromise
    .then((signedTx) => {
        alchemyWeb3.eth.sendSignedTransaction(
            signedTx.rawTransaction,
            function (err, hash) {
                if (!err) {
                    console.log(
                        "The hash of our transaction is: ",
                        hash,
                        "\nCheck Alchemy's Mempool to view the status of our transaction!"
                    );
                } else {
                    console.log(
                        "Something went wrong when submitting our transaction:",
                        err
                    );
                }
            }
        );
    })
    .catch((err) => {
        console.log(" Promise failed:", err);
    });