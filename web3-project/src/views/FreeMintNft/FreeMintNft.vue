<template>
  <div>
    <el-alert
      title="Digi Girls Nft"
      type="info"
      description="Digi Girls Nft is a test project, the Nft img is copy from the famous project of DigiDaigaku"
      :closable="false"
    />
    <div class="contract-address" v-if="nftContractAddress">
      Contract Address:
      <el-tag type="warn">{{ nftContractAddress }}</el-tag>
    </div>
    <div class="contract-address" v-if="nftContractAddress">
      OpenSea Address:
      <el-tag type="warn"
        >https://opensea.io/collection/digi-girls-gogogo</el-tag
      >
    </div>
    <el-divider />
    <template v-if="!currentAddress">
      <el-button type="success" @click="connectWallet"
        >Connect Wallet</el-button
      >
    </template>
    <template v-else>
      <div class="current-address" v-if="currentAddress">
        Wallet Connetted!! Current Address:
        <el-tag type="success">{{ currentAddress }}</el-tag>
      </div>
      <div class="current-address" v-if="currentAddress">
        You have
        <el-tag class="ml-2" type="success">{{ nftBalance }}</el-tag>
        Digi Girls
      </div>
      <el-divider />
      <el-button type="success" @click="clickMintNft" :loading="minting"
        >Mint Nft</el-button
      >
      <el-divider />
      <el-tabs v-model="nftTab" class="demo-tabs" @tab-change="handleTabChange">
        <el-tab-pane label="All Minted Nft" :name="NftTab.All">
          <NftsCard :nfts="allNfts" :loading="allNftLoading"
        /></el-tab-pane>
        <el-tab-pane label="My Minted Nft" :name="NftTab.My">
          <NftsCard :nfts="myNfts" :loading="myNftLoading"
        /></el-tab-pane>
      </el-tabs>
    </template>
  </div>
</template>
<script setup lang="ts">
import { Ref, ref, onMounted, watch } from "vue";
import { getAllDigiNfts, getMyDigiNfts } from "@/wallet/getNfts";
import { digiNftContract } from "@/wallet";
import {
  currentAddress,
  nftBalance,
  minting,
  connectWallet,
  mintNft,
  nftContractAddress,
} from "../../wallet";
import NftsCard from "./NftsCard.vue";

const allNftLoading = ref(false);
const myNftLoading = ref(false);
const allNfts: Ref<any[]> = ref([]);
const myNfts: Ref<any[]> = ref([]);

enum NftTab {
  All,
  My,
}

const nftTab: Ref<number> = ref(NftTab.All);

const handleTabChange = async (num: NftTab) => {
  nftTab.value = num;
  await getNfts();
};

onMounted(async () => {
  if (digiNftContract.value) {
    await getNfts();
  } else {
    watch([digiNftContract], async () => {
      await getNfts();
    });
  }
});

async function clickMintNft() {
  await mintNft();
  await getNfts();
}

async function getNfts() {
  if (nftTab.value === NftTab.All) {
    await getAllNft();
  } else {
    await getMyNft();
  }
}

async function getAllNft() {
  allNftLoading.value = true;
  try {
    const nftJsons = await getAllDigiNfts();
    allNfts.value = [...nftJsons!]?.reverse() as any[];
    console.log("allNfts: ", allNfts.value);
  } catch (err) {
    console.error(err);
  } finally {
    allNftLoading.value = false;
  }
}

async function getMyNft() {
  myNftLoading.value = true;
  const nftJsons = await getMyDigiNfts();
  myNfts.value = [...nftJsons!]?.reverse() as any[];
  console.log("myNfts: ", myNfts.value);
  myNftLoading.value = false;
}
</script>

<style scoped lang="scss">
.current-address {
  font-size: 12px;
  margin-bottom: 15px;
}
.contract-address {
  font-size: 12px;
  margin: 15px 0;
}
</style>
