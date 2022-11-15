import { ref, Ref } from "vue";
import { ElMessage } from "element-plus";
import { ethers, Contract } from "ethers";
import TokenArtifact from "../../contract/BuildWeb3Token.json";
import NftArtifact from "../../contract/MyDigiNft.json";
import { useNetwork } from "../hooks/useNetwork";
import { getRandomNft } from "../views/FreeMintNft/getRandomNft";

const hasMetaMask = !!window.ethereum;
const currentAddress: Ref<string> = ref("");
const tokenContract: Ref<Contract | null> = ref(null);
const digiNftContract: Ref<Contract | null> = ref(null);
const balance: Ref<string> = ref("0");
const nftBalance: Ref<string> = ref("0");
const initSuccess: Ref<boolean> = ref(false);
const minting: Ref<boolean> = ref(false);

let networkId = "";
const tokenContractAddress: Ref<string> = ref("");
const nftContractAddress: Ref<string> = ref("");

async function connectWallet() {
  const netWorkInfo = useNetwork();
  networkId = netWorkInfo.networkId;
  tokenContractAddress.value = netWorkInfo.tokenContractAddress;
  nftContractAddress.value = netWorkInfo.nftContractAddress;
  // This method is run when the user clicks the Connect. It connects the
  // dapp to the user's wallet, and initializes it.

  // To connect to the user's wallet, we have to run this method.
  // It returns a promise that will resolve to the user's address.
  const [selectedAddress] = (await window.ethereum!.request({
    method: "eth_requestAccounts",
  })) as string[];

  initializeEthers(selectedAddress);

  console.log(selectedAddress);
}

// We reinitialize it whenever the user changes their account.
window.ethereum!.on("accountsChanged", (accounts) => {
  reset();
  initializeEthers((accounts as string[])[0]);
});

window.ethereum!.on("chainChanged", () => {
  window.location.reload();
});

async function initializeEthers(userAddress: string) {
  const networkRight: boolean = checkNetwork();
  if (!networkRight) return;
  currentAddress.value = userAddress;
  // We first initialize ethers by creating a provider using window.ethereum
  const provider = new ethers.providers.Web3Provider(window.ethereum as any);

  const signer = provider.getSigner(0);
  console.log("signer:", signer);

  // Then, we initialize the contract using that provider and the token's
  // artifact. You can do this same thing with your contracts.
  // Goerli 0x7d840AfFCaCcdF8C0c123D28C521a28aaFC9Ae19

  tokenContract.value = await new ethers.Contract(
    tokenContractAddress.value,
    TokenArtifact.abi,
    signer
  );
  digiNftContract.value = await new ethers.Contract(
    nftContractAddress.value,
    NftArtifact.abi,
    signer
  );
  updateTokenBalance();
  updateNftBalance();
  initSuccess.value = true;
}

function reset() {
  currentAddress.value = "";
  tokenContract.value = null;
  digiNftContract.value = null;
  balance.value = "0";
  nftBalance.value = "0";
  initSuccess.value = false;
  minting.value = false;
}

async function updateTokenBalance() {
  balance.value = ethers.utils.formatEther(
    await (tokenContract.value as Contract).balanceOf(currentAddress.value)
  );
  console.log(currentAddress.value);
  console.log(balance.value.toString());
}

async function updateNftBalance() {
  nftBalance.value = await (digiNftContract.value as Contract).balanceOf(
    currentAddress.value
  );
  console.log("digiNft Balance:", nftBalance.value);
}

async function mintToken() {
  minting.value = true;
  const tx = await (tokenContract.value as Contract)
    .mint()
    .catch((error: any) => {
      if (error?.code === "ACTION_REJECTED") {
        minting.value = false;
        return;
      }
      throw new Error("Mint failed");
    });
  // We use .wait() to wait for the transaction to be mined. This method
  // returns the transaction's receipt.
  const receipt = await tx.wait();

  // The receipt, contains a status flag, which is 0 to indicate an error.
  if (receipt.status === 0) {
    // We can't know the exact error that made the transaction fail when it
    // was mined, so we throw this generic one.
    throw new Error("Transaction failed");
  }
  ElMessage({
    message: receipt.status
      ? "Congratulations!! You get 10M 'BuildWeb3' Token"
      : "Mint Fail",
    type: receipt.status ? "success" : "error",
  });
  minting.value = false;
  await updateTokenBalance();
}

async function mintNft() {
  minting.value = true;
  const tx = await (digiNftContract.value as Contract)
    .safeMint(`https://ipfs.io/ipfs/${getRandomNft()}`)
    .catch((error: any) => {
      if (error?.code === "ACTION_REJECTED") {
        minting.value = false;
        return;
      }
      ElMessage({
        message: "Mint Fail",
        type: "error",
      });
      minting.value = false;
      throw new Error(error);
    });
  // We use .wait() to wait for the transaction to be mined. This method
  // returns the transaction's receipt.
  const receipt = await tx.wait();

  // The receipt, contains a status flag, which is 0 to indicate an error.
  if (receipt.status === 0) {
    // We can't know the exact error that made the transaction fail when it
    // was mined, so we throw this generic one.
    throw new Error("Transaction failed");
  }
  ElMessage({
    message: receipt.status
      ? "Congratulations!! You Mint a Digi girl Nft Sucessfully"
      : "Mint Fail",
    type: receipt.status ? "success" : "error",
  });
  minting.value = false;
  await updateNftBalance();
}

// This method checks if Metamask selected network is Localhost:8545
function checkNetwork() {
  if (window.ethereum!.networkVersion == networkId) {
    return true;
  }

  ElMessage({
    message: "Please select the right network",
    type: "error",
  });

  return false;
}

async function addToken2Metamask() {
  if (!checkNetwork) return;
  // wasAdded is a boolean. Like any RPC method, an error may be thrown.
  const wasAdded = await window.ethereum!.request({
    method: "wallet_watchAsset",
    params: {
      type: "ERC20", // Initially only supports ERC20, but eventually more!
      options: {
        address: tokenContractAddress.value, // The address that the token is at.
        symbol: "BuildWeb3", // A ticker symbol or shorthand, up to 5 chars.
        decimals: 18, // The number of decimals in the token
        // image: tokenImage, // A string url of the token logo
      },
    },
  });

  ElMessage({
    message: wasAdded ? "Add Successful" : "Add fail",
    type: wasAdded ? "success" : "error",
  });
}

export {
  hasMetaMask,
  currentAddress,
  tokenContract,
  digiNftContract,
  balance,
  nftBalance,
  initSuccess,
  minting,
  networkId,
  tokenContractAddress,
  nftContractAddress,
  connectWallet,
  addToken2Metamask,
  mintToken,
  mintNft,
};
