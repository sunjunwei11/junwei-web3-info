const { expect } = require("chai")
const { ethers } = require("hardhat")
const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers")

describe("Token contract", function () {
    async function deployTokenFixture() {
        const Token = await ethers.getContractFactory("BuildWeb3Token")
        const [owner, addr1, addr2] = await ethers.getSigners()

        const intialSupply = ethers.utils.parseEther("1000000000")

        const mintNumEveryTime = ethers.utils.parseEther("10000000")

        const web3Token = await Token.deploy(intialSupply)

        await web3Token.deployed()

        // Fixtures can return anything you consider useful for your tests
        return {
            Token,
            web3Token,
            intialSupply,
            mintNumEveryTime,
            owner,
            addr1,
            addr2,
        }
    }

    it("Deployment should assign the total supply of tokens to the owner", async function () {
        const { web3Token, intialSupply, owner } = await loadFixture(
            deployTokenFixture
        )

        const ownerBalance = await web3Token.balanceOf(owner.address)
        const totalSupply = await web3Token.totalSupply()
        expect(totalSupply).to.equal(intialSupply)
        expect(ownerBalance).to.equal(intialSupply)
        console.log(totalSupply, intialSupply, ownerBalance)
    })

    it("Can Mint 1000M everytime", async function () {
        const { web3Token, intialSupply, mintNumEveryTime, owner } =
            await loadFixture(deployTokenFixture)

        await web3Token.mint()
        const ownerBalance = await web3Token.balanceOf(owner.address)
        const totalSupply = await web3Token.totalSupply()
        expect(totalSupply).to.equal(ownerBalance)
        expect(ownerBalance).to.equal(intialSupply.add(mintNumEveryTime))
        console.log(totalSupply, intialSupply, ownerBalance)
    })

    it("Every one can mint", async function () {
        const { web3Token, mintNumEveryTime, addr1 } = await loadFixture(
            deployTokenFixture
        )

        await web3Token.connect(addr1).mint()
        const addr1Balance = await web3Token.balanceOf(addr1.address)
        expect(addr1Balance).to.equal(mintNumEveryTime)
    })

    it("Transfer function", async function () {
        const { web3Token, mintNumEveryTime, addr1, addr2 } = await loadFixture(
            deployTokenFixture
        )

        await web3Token.connect(addr1).mint()

        const transferNum = ethers.utils.parseEther("100")

        await web3Token.connect(addr1).transfer(addr2.address, transferNum)

        const addr1Balance = await web3Token.balanceOf(addr1.address)
        const addr2Balance = await web3Token.balanceOf(addr2.address)
        expect(addr1Balance).to.equal(mintNumEveryTime.sub(transferNum))
        expect(addr2Balance).to.equal(transferNum)
    })
})
