import { digiNftContract, currentAddress } from "./index";
import {
  getTokenURI,
  getTotalSupply,
  getBalanceOf,
  getTokenOfOwnerByIndex,
} from "./interact/nft";
import axios from "axios";
import { watch } from "vue";

let allNfts: any[] = [];
let myNfts: any[] = [];

watch(currentAddress, () => {
  myNfts = [];
});

async function getAllDigiNfts() {
  if (!digiNftContract.value) {
    return;
  }
  const contract = digiNftContract.value;
  const totalSupply = await getTotalSupply(contract);

  const tokenIds: number[] = [];
  for (let i = allNfts.length; i < totalSupply; i++) {
    tokenIds.push(i);
  }

  const nftJsons = (await getJsonByTokenIds(tokenIds)) as any[];
  allNfts = [...allNfts, ...nftJsons];
  return allNfts;
}

async function getMyDigiNfts() {
  if (!currentAddress.value || !digiNftContract.value) {
    return;
  }
  const contract = digiNftContract.value;
  const ownerBalance = await getBalanceOf(contract, currentAddress.value);
  let tokenIds: number[] = [];
  const temp = [];
  for (let i = myNfts.length; i < ownerBalance; i++) {
    temp.push(getTokenOfOwnerByIndex(contract, currentAddress.value, i));
    if (temp.length === 5 || i >= ownerBalance - 1) {
      const res = await Promise.all(temp);
      tokenIds = [...tokenIds, ...res];
    }
  }
  const nftJsons = (await getJsonByTokenIds(tokenIds)) as any[];
  myNfts = [...myNfts, ...nftJsons];
  return myNfts;
}

async function getJsonByTokenIds(tokenIds: number[]) {
  if (!digiNftContract.value) {
    return;
  }
  const contract = digiNftContract.value;
  let nfts: any[] = [];
  const tokenIdsLength = tokenIds.length;
  let temp: Promise<string>[] = [];
  for (let i = 0; i < tokenIdsLength; i++) {
    temp.push(getTokenURI(contract, tokenIds[i]));
    if (temp.length === 5 || i >= tokenIdsLength - 1) {
      const urlRes = await Promise.all(temp);
      const jsonPromiseArray = [];
      for (let j = 0; j < urlRes.length; j++) {
        jsonPromiseArray.push(axios.get(urlRes[j]));
      }
      const jsonRes = [...(await Promise.all(jsonPromiseArray))].map(
        (item) => (item as any).data
      );
      nfts = [...nfts, ...jsonRes];
      temp = [];
    }
  }
  nfts.forEach((item, index) => {
    item.tokenId = tokenIds[index];
    item.attributes.forEach((attr: any) => {
      if (attr.trait_type === "Hair Length") {
        item.hairLength = attr.value;
      }
      if (attr.trait_type === "Hair Color") {
        item.hairColor = attr.value;
      }
      if (attr.trait_type === "Cloth") {
        item.cloth = attr.value;
      }
    });
  });
  return nfts;
}

export { getAllDigiNfts, getMyDigiNfts };
