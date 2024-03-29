const {
    FlashbotsBundleProvider,
  } = require("@flashbots/ethers-provider-bundle");
  const { BigNumber } = require("ethers");
  const { ethers } = require("hardhat");
  require("dotenv").config({ path: ".env" });
  
  async function main() {
    // Deploy FakeNFT Contract
    const fakeNFT = await ethers.getContractFactory("FakeNFT");
    const FakeNFT = await fakeNFT.deploy();
    await FakeNFT.deployed();
  
    console.log("Address of Fake NFT Contract:", FakeNFT.address);
  
    // Create a Quicknode WebSocket Provider
    const provider = new ethers.providers.WebSocketProvider(
      'wss://goerli.infura.io/ws/v3/01b94e7cd6fb4a8998e35d74593f3fac',
      "goerli"
    );
  
    // Wrap your private key in the ethers Wallet class
    const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
  
    // Create a Flashbots Provider which will forward the request to the relayer
    // Which will further send it to the flashbot miner
    const flashbotsProvider = await FlashbotsBundleProvider.create(
      provider,
      signer,
      // URL for the flashbots relayer
"https://relay-goerli.flashbots.net",
      "goerli"
    );
//   let val;
//   val = ethers.utils.parseUnits("0.001","ether");
//   console.log(val.toString())
    provider.on("block", async (blockNumber) => {
      console.log("Block Number: ", blockNumber);
      // Send a bundle of transactions to the flashbot relayer
      const bundleResponse = await flashbotsProvider.sendBundle(
        [
          {
            transaction: {
              // ChainId for the goerli network
              chainId: 5,
              // EIP-1559
              type: 2,
              // Value of 1 FakeNFT
              
              value: ethers.utils.parseEther('0.001'),
              // Address of the FakeNFT
              to: FakeNFT.address,
              // In the data field, we pass the function selector of the mint function
              data: FakeNFT.interface.getSighash("mint()"),
              maxFeePerGas: BigNumber.from(10).pow(9).mul(3),
              // Max Priority gas fees you are willing to pay
              maxPriorityFeePerGas: BigNumber.from(10).pow(9).mul(2),
        
            },
            signer: signer,
          },
        ],
        blockNumber + 1, //every time the bundle is incremented we send the bundle of transaciton to each block where there would be miner or no miner to include the transaction
     
      );
      // console.log( await bundleResponse.wait()) //to see that the bundle is included or not
  
      // If an error is present, log it
      if ("error" in bundleResponse) {
        console.log(bundleResponse.error.message);
      }
    });
  }
  
  main();