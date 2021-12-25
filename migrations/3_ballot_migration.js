const Ballot = artifacts.require ('Ballot');

module.exports = async function (deployer) {
 var cand = ['ji','jiji','jijiji'];
	
  await deployer.deploy(Ballot,cand);
	
	
};

