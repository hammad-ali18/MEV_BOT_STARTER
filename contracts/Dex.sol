pragma solidity >=0.8.4;


import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

import "hardhat/console.sol";
contract Dex{
// this is the pool  which contains two tokens

// address private immutable usdc;
// address private immutable  dai;

IERC20 private dai;
IERC20 private usdc;

    // exchange rate indexes
    uint256 dexARate = 90;
    uint256 dexBRate = 100;

//keeping the track of balances 

mapping(address=> uint256) public daiBalance;
mapping(address=> uint256) public usdcBalance;

constructor(address _daiAddress, address _usdcAddress){
dai = IERC20(_daiAddress);
usdc = IERC20(_usdcAddress);
}

//to deposit dai to this contract
function depositDai(uint256 _amount) external{
daiBalance[msg.sender] += _amount;
console.log(daiBalance[msg.sender]);
//allowance should be greater than the amount
bool approve = dai.approve(address(this),_amount);
console.log("35");
uint256 allowance = dai.allowance(msg.sender, address(this));
console.log(allowance,_amount);
require(allowance >= _amount,"Dai Allowance is less than amount");
dai.transferFrom(msg.sender,address(this),_amount);


   
}
//to deposit dai to this contract
function depositUsdc(uint256 _amount) external{
usdcBalance[msg.sender] += _amount;
//allowance should be greater than the amount
uint256 allowance = usdc.allowance(msg.sender, address(this));
require(allowance >= _amount,"Usdc Allowance is less than amount");
usdc.transferFrom(msg.sender,address(this),_amount);

}

// another user can buy dai at a specific rate
function buyDai() external{
          uint256 daiToReceive = ((usdcBalance[msg.sender] / dexARate) * 100) *
            (10**12);
        dai.transfer(msg.sender, daiToReceive);
}

    function buyUsdc() external {
        uint256 usdcToReceive = ((daiBalance[msg.sender] * dexBRate) / 100) /
            (10**12);
        usdc.transfer(msg.sender, usdcToReceive);
    }


  //to get balance of the token in this pool

  function getBalance(address _tokenAddress) external returns(uint256){
return IERC20(_tokenAddress).balanceOf(address(this));
  } 

function widthDraw(address _tokenAddress) external returns(uint256){
     IERC20 token = IERC20(_tokenAddress);
        token.transfer(msg.sender, token.balanceOf(address(this)));
}
    
}
