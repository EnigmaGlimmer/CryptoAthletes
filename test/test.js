import ether from './helpers/ether';
import assertRevert from './helpers/assertRevert';
import EVMRevert from './helpers/EVMRevert';

const BigNumber = web3.BigNumber;
const AthleteCoin = artifacts.require('./athleteownership.sol');

require('chai')
  .use(require('chai-as-promised'))
  .use(require('chai-bignumber')(BigNumber))
  .should();

contract('AthleteCoin', function (accounts) {

  let token = null;
  let token2 = null;
  const ZERO = new BigNumber(0);
  const ONE = new BigNumber(1);
  const TWO = new BigNumber(2);
  const THREE = new BigNumber(3);

  const _creator = accounts[0];

  beforeEach(async function () {
    token = await AthleteCoin.new({ from: _creator });
    token2 = await AthleteCoin.new({ from: accounts[1] })
  });

  it("test case example", async function() {
    const balanceCreator = await token.balanceOf(_creator);
    balanceCreator.should.be.bignumber.equal(ZERO);
  });

  it("Test createAthlete", async function() {
    await token.createRandomAthlete("test", { from: _creator });
    const balanceCreator = await token.balanceOf(_creator, { from: _creator });
    balanceCreator.should.be.bignumber.equal(ONE);
    const athleteIDs = await token.getAthletesByOwner(_creator, { from: _creator });
    const matchingAddress = await token.ownerOf(athleteIDs[0], { from: _creator });
    matchingAddress.should.equal(_creator);
  });

  it("Test buyPackAthletes", async function() {
    await token.createRandomAthlete("test", { from: _creator });
    await token.buyPackAthletes("Kendrick", "Future", { value: ether(0.08), from: _creator } )
    const athleteIDs = await token.getAthletesByOwner(_creator, { from: _creator });
    const tokenName = await token.getName(athleteIDs[2], { from: _creator });

    tokenName.should.be.equal("Future");    
  });

  it("Verify users can only create one athlete.", async function() {
    await token.createRandomAthlete("test", { from: _creator });
    const balanceCreator = await token.balanceOf(_creator, { from: _creator });
    balanceCreator.should.be.bignumber.equal(ONE);
    const athleteIDs = await token.getAthletesByOwner(_creator, { from: _creator });
    const matchingAddress = await token.ownerOf(athleteIDs[0], { from: _creator });
    matchingAddress.should.equal(_creator);

    // Attempt to create a second athlete.
    //await assertRevert(await token.createRandomAthlete("test", { from: _creator }));
    await token.createRandomAthlete("test", { from: _creator }).should.be.rejectedWith(EVMRevert);
  });

  it("Test attackAthlete", async function() {
    await token.createRandomAthlete("test", { from: _creator });
    await token2.createRandomAthlete("test2", { from: accounts[1]});

    const athleteIDs1 = await token.getAthletesByOwner(_creator, { from: _creator});
    const athleteIDs2 = await token2.getAthletesByOwner(accounts[1], { from: accounts[1]});

    await token.attack(athleteIDs1[0], athleteIDs2[0], {from: _creator});

    const token1Wins = await token.winCount(athleteIDs1[0], { from: _creator });
    token1Wins.should.be.bignumber.equal(ONE);
    const token1Level = await token.level(athleteIDs1[0], { from: _creator });
    token1Level.should.be.bignumber.equal(ONE);

  });

  for (var i = 0; i < 49; i++) {
    it("Test attackAthlete 50times", async function() {
      await token.createRandomAthlete("test", { from: _creator });
      await token2.createRandomAthlete("test2", { from: accounts[1]});

      const athleteIDs1 = await token.getAthletesByOwner(_creator, { from: _creator});
      const athleteIDs2 = await token2.getAthletesByOwner(accounts[1], { from: accounts[1]});

      await token.attack(athleteIDs1[0], athleteIDs2[0], {from: _creator});

      const token1Wins = await token.winCount(athleteIDs1[0], { from: _creator });

      token1Wins.should.be.bignumber.equal(ONE);
    });
  }



  it("Test must be correct level", async function() {
    await token.createRandomAthlete("test", { from: _creator });

    const athleteIDs1 = await token.getAthletesByOwner(_creator, { from: _creator});

    await token.changeName(athleteIDs1[0], "swag", { from: _creator }).should.be.rejectedWith(EVMRevert);
    const newDna = 4553710577265501;
    await token.changeDna(athleteIDs1[0], newDna, { from: _creator }).should.be.rejectedWith(EVMRevert);

  });

    //assert revert test all the athlete helper functions

  it("Test levelUpAthlete", async function() {
    await token.createRandomAthlete("test", { from: _creator });

    const athleteIDs1 = await token.getAthletesByOwner(_creator, { from: _creator});

    await token.levelUp(athleteIDs1[0], { value: ether(0.001), from: _creator });
    await token.levelUp(athleteIDs1[0], { value: ether(0.001), from: _creator });

    const token1Level = await token.level(athleteIDs1[0], { from: _creator });
    token1Level.should.be.bignumber.equal(THREE);
  });

  it("Test changeName and Dna", async function() {
    await token.createRandomAthlete("test", { from: _creator });

    const athleteIDs1 = await token.getAthletesByOwner(_creator, { from: _creator});

    await token.levelUp(athleteIDs1[0], { value: ether(0.001), from: _creator });
    await token.levelUp(athleteIDs1[0], { value: ether(0.001), from: _creator });

    await token.changeName(athleteIDs1[0], "Big Nick", {from: _creator });

    const tokenName = await token.getName(athleteIDs1[0], { from: _creator });

    tokenName.should.be.equal("Big Nick");
  })


  it("Test transfer token, should not transfer", async function() {
    await token.createRandomAthlete("test", { from: _creator });
    await token.createRandomAthlete("test2", { from: accounts[1]});

    const athleteIDs1 = await token.getAthletesByOwner(_creator, { from: _creator });
    const athleteIDs2 = await token.getAthletesByOwner(accounts[1], { from: accounts[1] });

    const tokenId = await token.getAthletesByOwner
    await token.transfer(accounts[1], 0, { from: _creator }).should.be.fulfilled;

    const balanceAccount2 = await token.balanceOf(accounts[1], { from: accounts[1] });
    balanceAccount2.should.be.bignumber.equal(TWO);
  });  
  

});