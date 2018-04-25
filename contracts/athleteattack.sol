pragma solidity ^0.4.19;

import "./athletehelper.sol";

contract AthleteAttack is AthleteHelper {
  uint randNonce = 0;
  uint attackVictoryProbability = 30;

  function randMod(uint _modulus) internal returns(uint) {
    randNonce++;
    return uint(keccak256(now, msg.sender, randNonce)) % _modulus;
  }

  function attack(uint _athleteId, uint _targetId) external onlyOwnerOf(_athleteId) {
    Athlete storage myAthlete = athletes[_athleteId];
    Athlete storage enemyAthlete = athletes[_targetId];
    uint rand = randMod(100);
    
    attackVictoryProbability = getOffRating(_athleteId) + getDefRating(_targetId);
    attackVictoryProbability = ((getOffRating(_athleteId) * 100) / attackVictoryProbability);

    if (rand <= attackVictoryProbability) {
      myAthlete.winCount++;
      myAthlete.level++;
      enemyAthlete.lossCount++;
      //feedAndMultiply(_athleteId, enemyAthlete.dna, "athlete");
      
      //Can change for testing purposes
      myAthlete.offensiveRating++;
      enemyAthlete.defensiveRating--;
    } else {
      myAthlete.lossCount++;
      enemyAthlete.winCount++;
      _triggerCooldown(myAthlete);

      //Can change for testing purposes
      myAthlete.offensiveRating--;
      enemyAthlete.defensiveRating++;
    }
  }

  function winCount(uint _athleteId) public view returns(uint) {
    Athlete storage myAthlete = athletes[_athleteId];
    return myAthlete.winCount;
  }

  function lossCount(uint _athleteId) public view returns(uint) {
    Athlete storage myAthlete = athletes[_athleteId];
    return myAthlete.lossCount;
  }

  function level(uint _athleteId) public view returns(uint) {
    Athlete storage myAthlete = athletes[_athleteId];
    return myAthlete.level;
  }

  function getName(uint _athleteId) public view returns(string) {
    Athlete storage myAthlete = athletes[_athleteId];
    return myAthlete.name;
  }

  function getOffRating(uint _athleteId) public view returns(uint16) {
    Athlete storage myAthlete = athletes[_athleteId];
    return myAthlete.offensiveRating;
  }

  function getDefRating(uint _athleteId) public view returns(uint16) {
    Athlete storage myAthlete = athletes[_athleteId];
    return myAthlete.defensiveRating;
  }
}
