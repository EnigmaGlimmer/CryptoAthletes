pragma solidity ^0.4.19;

import "./athletefeeding.sol";

contract AthleteHelper is AthleteFeeding {

  uint levelUpFee = 0.001 ether;

  modifier aboveLevel(uint _level, uint _athleteId) {
    require(athletes[_athleteId].level >= _level);
    _;
  }

  function withdraw() external onlyOwner {
    owner.transfer(this.balance);
  }

  function setLevelUpFee(uint _fee) external onlyOwner {
    levelUpFee = _fee;
  }

  function levelUp(uint _athleteId) external payable {
    require(msg.value == levelUpFee);
    athletes[_athleteId].level++;
  }

  function changeName(uint _athleteId, string _newName) external aboveLevel(2, _athleteId) onlyOwnerOf(_athleteId) {
    athletes[_athleteId].name = _newName;
  }

  function changeDna(uint _athleteId, uint _newDna) external aboveLevel(20, _athleteId) onlyOwnerOf(_athleteId) {
    athletes[_athleteId].dna = _newDna;
  }

  function getAthletesByOwner(address _owner) external view returns(uint[]) {
    uint[] memory result = new uint[](ownerAthleteCount[_owner]);
    uint counter = 0;
    for (uint i = 0; i < athletes.length; i++) {
      if (athleteToOwner[i] == _owner) {
        result[counter] = i;
        counter++;
      }
    }
    return result;
  }

}
