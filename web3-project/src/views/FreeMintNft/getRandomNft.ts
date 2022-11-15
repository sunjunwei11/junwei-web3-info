const nftJsons = [
  "QmYUhzs8FsVaxRSB8fFbohfVzgNR5MHXbcvj9rkYYYCKJX",
  "Qmep7jzBATwNamThnnNP3rgeSXe89Cc5bQvriehbYfjkoW",
  "QmNYREkCgNuoMctYMf8vuD9m89nnXVJpXtvQj9su46Nvr8",
  "QmboJosjAuYo2Jg2Ar6xjfX7mCtYpnhrqeQ9M1N9e73UiC",
  "QmeznKyVm5BPUPMdWi4kzAa6K2Qd296RJYpz6UaaCn75Wt",
  "QmaGP1Kjp5wRuGnfg8fP1Xvb7PSnVn3BeStkGmFdbDxxTN",
  "QmSTpn38fFcSZhP73pFzFYMbjncEpz1WPJqurh8HfJRaYA",
  "QmZziJVzpCfV1FrRq83M1SQk7tecdBeuh8EZiQpPWjUFLZ",
  "QmUjvXFN9A1TGGncrqvJC43kGZyhdzQnGDyXGaoDmFGBjt",
  "QmSafUJ2acrusnViHxM3gPQLiwBcTYd3iejw2ai146tDCL",
  "Qme6ivPHxphPgMUHUhyjbNPbHT1uTEhHZ1HF4SRdFNEYC9",
  "QmVZ1UQETV5oabMBFc2BhQ74vhZsamHfhFqtUGx3nS8jpS",
];

const getRandomNft = () => {
  const nftLength = nftJsons.length;
  const randomNum = Math.floor(Math.random() * nftLength);
  const selectedNft = nftJsons[randomNum];
  return selectedNft;
};

export { getRandomNft };
