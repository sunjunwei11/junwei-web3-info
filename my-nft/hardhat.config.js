require("@nomicfoundation/hardhat-toolbox")
require("dotenv").config()

console.log()

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
    solidity: "0.8.17",
    networks: {
        hardhat: {
            chainId: 1337, // We set 1337 to make interacting with MetaMask simpler
        },
        goerli: {
            url: `https://eth-goerli.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`,
            accounts: [process.env.GOERLI_PRIVATE_KEY],
        },
        main: {
            url: `https://eth-mainnet.g.alchemy.com/v2/5PkPrBWQ_G0gRWk_im2T9t4M2y_M9aDF`,
            accounts: [""],
        },
    },
}
