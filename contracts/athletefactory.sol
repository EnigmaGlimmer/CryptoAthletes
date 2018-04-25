pragma solidity ^0.4.19;

import "./ownable.sol";
import "./safemath.sol";

contract AthleteFactory is Ownable {

  using SafeMath for uint256;

  event NewAthlete(uint athleteId, string name, uint dna);

  uint dnaDigits = 16;
  uint dnaModulus = 10 ** dnaDigits;
  uint cooldownTime = 1 days;

  uint packPrice = 0.08 ether;


  struct Athlete {
    string name;
    uint dna;
    uint32 level;
    uint32 readyTime;
    uint16 winCount;
    uint16 lossCount;

    //everyone is default offensiveRating of 70
    uint16 offensiveRating;
    //everyone has a default defensiveRating of 70
    uint16 defensiveRating;
  }

  Athlete[] public athletes;

  mapping (uint => address) public athleteToOwner;
  mapping (address => uint) public ownerAthleteCount;

  function _createAthlete(string _name, uint _dna) internal {
    uint id = athletes.push(Athlete(_name, _dna, 1, uint32(now + cooldownTime), 0, 0, 50, 30)) - 1;
    athleteToOwner[id] = msg.sender;
    ownerAthleteCount[msg.sender]++;
    NewAthlete(id, _name, _dna);
  }

  function _generateRandomDna(string _str) private view returns (uint) {
    uint rand = uint(keccak256(_str));
    return rand % dnaModulus;
  }

  function createRandomAthlete(string _name) public {
    require(ownerAthleteCount[msg.sender] == 0);
    uint randDna = _generateRandomDna(_name);
    randDna = randDna - randDna % 100;
    _createAthlete(_name, randDna);
  }

  function buyPackAthletes(string _name, string _name2) external payable {
    require(msg.value == packPrice);
    uint randDna = _generateRandomDna(_name);
    randDna = randDna - randDna % 100;
    _createAthlete(_name, randDna);

    uint randDna2 = _generateRandomDna(_name2);
    randDna2 = randDna2 - randDna2 % 100;
    _createAthlete(_name2, randDna2);
  }

}
