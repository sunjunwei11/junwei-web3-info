import { network } from "@/store";

function useNetwork() {
  const useGoerliTestNetWork = network.value === "goerli";
  const goerliNetworkId = "5";
  const ethNetworkId = "1";
  const networkId = useGoerliTestNetWork ? goerliNetworkId : ethNetworkId;
  const goerliContractAddress = "0x93C3FFaE436BfDB07Ea9D67a69cf8a5fF90d2512";
  const ethContractAddress = "0x72F7A1F6eB1a799eb5Ce736916bfF44F323f6768";
  const tokenContractAddress = useGoerliTestNetWork
    ? goerliContractAddress
    : ethContractAddress;

  const goerliNftContractAddress = "0x3E1F3A5e0Ab6a8555eB0489D991a3312958D05b3";
  const ethNftContractAddress = "0xAE1876C9a02AfCD0Cd4d20fCcf279b07cb0E1F72";
  const nftContractAddress = useGoerliTestNetWork
    ? goerliNftContractAddress
    : ethNftContractAddress;
  return {
    networkId,
    tokenContractAddress,
    nftContractAddress,
  };
}

export { useNetwork };
