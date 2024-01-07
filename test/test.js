const { expect } = require("chai");
const { poll } = require("ethers/lib/utils");
const { waffle,ethers } = require("hardhat");
const { userInfo } = require("os");
const provider = waffle.provider;
const web3 = require("web3");



describe('Greeter', () =>{

    const [owner, accountOne] = provider.getWallets();

const daiAddress ="0xDF1742fE5b0bFc12331D8EAec6b478DfDbD31464";
const usdcAddress = "0xA2025B15a1757311bfD68cb14eaeFCc237AF5b43"
let pool;
let flashloan
let tokenA;
let tokenB;
    before( async () =>{
        Greeter = await ethers.getContractFactory("Greeter");
        greeter = await Greeter.deploy("Hello World");
        
        const TokenA = await ethers.getContractFactory("ERC20")
      tokenA  = await TokenA.deploy("Dai Token","DAI");
       console.log("Dai Address: ",tokenA.address)
       const TokenB = await ethers.getContractFactory("ERC20");
       tokenB = await TokenB.deploy("Usdc Token","USDC")
       console.log("USDC Address: ",tokenB.address);


    //     const Pool = await ethers.getContractFactory("Dex");
    //    pool = await Pool.deploy();
    //     console.log("Dex pool address: ",pool.address);



        // const FlashLoan = await ethers.getContractFactory("FlashLoan");
        //   flashloan = await FlashLoan.deploy(pool.address);
        //   console.log("flash loan address: ",flashloan.address)
})

    it('Dex', async () =>{
        // let message =await greeter.greet();
        // await expect(message).equal("Hello World");


//   let depositDai = await pool.connect(owner).depositDai(web3.utils.toWei("0.00000000000000008"));
//   let usdcDeposit= await pool.connect(owner).depositUsdc(web3.utils.toWei("0.00000000000000002"));

        // let daiBalance = await pool.getBalance(daiAddress);
        // console.log("Dai Balance in pool: ", daiBalance.toString());
        // let usdcBalance = await pool.getBalance(usdcAddress);
        // console.log("Usdc Balance in pool: ", usdcBalance.toString());

        mintA = await tokenA.mint(owner.address,"")
    })

   
})