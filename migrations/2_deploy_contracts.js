var Athlete = artifacts.require("athleteownership");

module.exports = function(deployer) {
  deployer.deploy(Athlete);
};