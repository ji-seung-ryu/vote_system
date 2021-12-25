var greeter = artifacts.require("Greeter");
var par = 'jijijij'

module.exports = function(deployer) {
  deployer.deploy(greeter, par);
};