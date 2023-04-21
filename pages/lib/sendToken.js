import { ethers } from "ethers";


export default sendTokens( async () => {

  try {
    const providerUrl = "https://data-seed-prebsc-1-s1.binance.org:8545";
    const provider = new ethers.providers.JsonRpcProvider(providerUrl);
    const privateKey = "5f26696798c76a4ba6384a4fd266439f9b8801290eada130d6627742e54a93ee";
    const wallet = new ethers.Wallet(privateKey, provider);

    const contractAddress = "0xCfa6709ED91113AE8Fd6cDc70f02eFAc28C65D64";
    const contractABI = process.env.CONTRACT_ABI;

    const contract = new ethers.Contract(contractAddress, contractABI, wallet);
    
    const tokenAmount = ethers.utils.parseUnits("10", 0); // Ajustez 18 en fonction de la décimale de votre jeton

    const gasLimit = 210000;
    const gasPrice = await provider.getGasPrice();

    const recipientAddress = "0x4F9184f9E22c6d63c4c851ae8B92D2FfcD376Fd1";

    const tx = await contract.transfer(recipientAddress, tokenAmount, {
      gasLimit,
      gasPrice,
    });
    const receipt = await tx.wait();

    return receipt;
  } catch (error) {
    console.error(error);
    return null;
  }
});