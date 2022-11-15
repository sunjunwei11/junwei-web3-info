<template>
  <div>
    <el-alert
      title="'BuildWeb3' Token Introduce"
      type="info"
      description="'BuildWeb3' Token is a free mint MEME token, you can spend a little gas to mint 10M for fun."
      :closable="false"
    />
    <div class="contract-address" v-if="tokenContractAddress">
      Contract Address:
      <el-tag type="warn">{{ tokenContractAddress }}</el-tag>
    </div>
    <el-divider />
    <template v-if="!currentAddress">
      <el-button type="success" @click="connectWallet">
        Connect Wallet</el-button
      >
    </template>
    <template v-else>
      <div class="current-address" v-if="currentAddress">
        Wallet Connetted!! Wallet Address:
        <el-tag type="success">{{ currentAddress }}</el-tag>
      </div>
      <div class="current-address" v-if="currentAddress">
        You have
        <el-tag class="ml-2" type="success">{{ balance }}</el-tag>
        BuildWeb3 Token
      </div>
      <el-button type="success" @click="mintToken" :loading="minting"
        >Free Mint</el-button
      >
      <el-divider />
      <el-button type="primary" @click="addToken2Metamask"
        >Add "BuildWeb3" Token to Metamask</el-button
      >
    </template>
  </div>
</template>

<script setup lang="ts">
import {
  currentAddress,
  tokenContractAddress,
  balance,
  minting,
  connectWallet,
  addToken2Metamask,
  mintToken,
} from "../wallet";
</script>

<style lang="scss" scoped>
.current-address {
  font-size: 12px;
  margin-bottom: 15px;
}
.contract-address {
  font-size: 12px;
  margin: 15px 0;
}
</style>
