pragma solidity ^0.4.19;

import "./athleteattack.sol";
import "./erc721.sol";
import "./safemath.sol";

/// TODO: Replace this with natspec descriptions
contract AthleteOwnership is AthleteAttack, ERC721 {

  using SafeMath for uint256;

  mapping (uint => address) athleteApprovals;

  function balanceOf(address _owner) public view returns (uint256 _balance) {
    return ownerAthleteCount[_owner];
  }

  function ownerOf(uint256 _tokenId) public view returns (address _owner) {
    return athleteToOwner[_tokenId];
  }

  function _transfer(address _from, address _to, uint256 _tokenId) private {
    ownerAthleteCount[_to] = ownerAthleteCount[_to].add(1);
    ownerAthleteCount[msg.sender] = ownerAthleteCount[msg.sender].sub(1);
    athleteToOwner[_tokenId] = _to;
    Transfer(_from, _to, _tokenId);
  }

  function transfer(address _to, uint256 _tokenId) public onlyOwnerOf(_tokenId) {
    _transfer(msg.sender, _to, _tokenId);
  }

  function approve(address _to, uint256 _tokenId) public onlyOwnerOf(_tokenId) {
    athleteApprovals[_tokenId] = _to;
    Approval(msg.sender, _to, _tokenId);
  }

  function takeOwnership(uint256 _tokenId) public {
    require(athleteApprovals[_tokenId] == msg.sender);
    address owner = ownerOf(_tokenId);
    _transfer(owner, msg.sender, _tokenId);
  }
}
