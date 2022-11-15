import { Contract } from "ethers";

// Returns the owner of the tokenId token.
async function getOwnerOf(cantract: Contract, tokenId: number) {
  const address = await cantract.ownerOf(tokenId);
  return address;
}

// Returns the number of tokens in owner's account.
async function getBalanceOf(cantract: Contract, address: string) {
  const balance = await cantract.balanceOf(address);
  return balance;
}

async function getTokenOfOwnerByIndex(
  cantract: Contract,
  address: string,
  index: number
) {
  const tokenId = await cantract.tokenOfOwnerByIndex(address, index);
  return tokenId;
}

// Returns the Uniform Resource Identifier (URI) for tokenId token.
async function getTokenURI(cantract: Contract, tokenId: number) {
  const tokenUri = await cantract.tokenURI(tokenId);
  return tokenUri;
}

// Returns the total amount of tokens stored by the contract.
async function getTotalSupply(cantract: Contract) {
  const total = await cantract.totalSupply();
  return total;
}

export {
  getOwnerOf,
  getBalanceOf,
  getTokenURI,
  getTotalSupply,
  getTokenOfOwnerByIndex,
};
