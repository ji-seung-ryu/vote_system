const Ballot = artifacts.require("Ballot");

contract("Ballot", (accounts) => {
  it("Should return the new greeting once it's changed", async function () {
	  var Instance; 
	  
	   before(async function() {
		   
		   var cand = ['jii','jiji','jijijij'];
        // set contract instance into a variable
        Instance = await Ballot.new(cand);
    })
	  
   it("#1 check 1st", async function() {
        // set the expected greeting message
        var expected = 'jii';
        var winner= await Instance.winnerName();
        assert.equal(expected, winner, "winner is jii");

    })

   
  });
});


