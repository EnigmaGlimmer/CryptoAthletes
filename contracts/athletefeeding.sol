pragma solidity ^0.4.19;

import "./athletefactory.sol";

contract KittyInterface {
  function getKitty(uint256 _id) external view returns (
    bool isGestating,
    bool isReady,
    uint256 cooldownIndex,
    uint256 nextActionAt,
    uint256 siringWithId,
    uint256 birthTime,
    uint256 matronId,
    uint256 sireId,
    uint256 generation,
    uint256 genes
  );
}

contract AthleteFeeding is AthleteFactory {

  KittyInterface kittyContract;

  modifier onlyOwnerOf(uint _athleteId) {
    require(msg.sender == athleteToOwner[_athleteId]);
    _;
  }

  function setKittyContractAddress(address _address) external onlyOwner {
    kittyContract = KittyInterface(_address);
  }

  function _triggerCooldown(Athlete storage _athlete) internal {
    _athlete.readyTime = uint32(now + cooldownTime);
  }

  function _isReady(Athlete storage _athlete) internal view returns (bool) {
      return (_athlete.readyTime <= now);
  }

  function feedAndMultiply(uint _athleteId, uint _targetDna, string _species) internal onlyOwnerOf(_athleteId) {
    Athlete storage myAthlete = athletes[_athleteId];
    require(_isReady(myAthlete));
    _targetDna = _targetDna % dnaModulus;
    uint newDna = (myAthlete.dna + _targetDna) / 2;
    if (keccak256(_species) == keccak256("kitty")) {
      newDna = newDna - newDna % 100 + 99;
    }
    _createAthlete("NoName", newDna);
    _triggerCooldown(myAthlete);
  }

  function feedOnKitty(uint _athleteId, uint _kittyId) public {
    uint kittyDna;
    (,,,,,,,,,kittyDna) = kittyContract.getKitty(_kittyId);
    feedAndMultiply(_athleteId, kittyDna, "kitty");
  }
}
