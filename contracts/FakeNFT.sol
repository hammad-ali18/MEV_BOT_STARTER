// This lesson is just meant to show you how you use Flashbots 
// to send transactions in the first place, the rest is up to you!
//  This is going to be a very simple use case designed to teach you how to use Flashbots,
// not make a profit. Finding opportunities where you can make profit using MEV is a hard problem and are typically not public information
pragma solidity >=0.8.4;
import  "@openzeppelin/contracts/token/ERC721/ERC721.sol";


contract FakeNFT is ERC721 {
    uint256 tokenId = 1;
    uint256 constant price = 0.001 ether;

    constructor() ERC721("FAKE", "FAKE") {}

    function mint() public payable {
        require(msg.value == price, "Ether sent is incorrect");
        _mint(msg.sender, tokenId);
        tokenId += 1;
    }
    
}
