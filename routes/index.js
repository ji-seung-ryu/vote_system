var express = require('express');
var Web3 = require('web3');
let json = require('/workspace/20211204/vote_system/build/contracts/Ballot.json');
var abi = json['abi'];
var router = express.Router();
const web3 = new Web3(new Web3.providers.HttpProvider('https://rinkeby.infura.io/v3/938128f51def4e89a15e10bebb9a4636'))
var address = '0xB2Ad083a44bEb48417Fe93Ea1FaD8FDf53D155e9';
var shelloContract = new web3.eth.Contract(abi, address);

var account0, account1;



/* GET home page. */
router.get('/', async function (req, res, next) {
    
    console.log (web3.eth.abi.encodeFunctionCall({
		name: 'vote',
		type: 'function',
		 inputs: [{
        type: 'uint256',
        name: 'proposal'
			 
    }]}
		, [1]));
	
console.log (web3.eth.abi.encodeFunctionSignature('vote(uint256)'));
console.log(web3.eth.abi.encodeParameter('uint256', 1));

						
    var proposals = await shelloContract.methods.get_proposals().call();
	
    var ret = {};
    ret['vote_cnt'] = 1;
    var idx = 1;
    ret['cand'] = [];
	
	//var proposals = [{name:'ji', vote_cnt : 1},{name:'jiji', vote_cnt : 2},{name:'jijiji', vote_cnt : 3}];
    for (let proposal of proposals) {
        ret['cand'].push({ num: idx, name: proposal.name , voteCount: proposal.voteCount});
        idx += 1;
    }
    res.render('index', ret);

    /*
             shelloContract.methods
						.vote(1)
						.send({from:account, gas:300000})						
						.then (function(reject,receipt){
							if (reject) console.log (reject);
							if (receipt) console.log (receipt);
							
							shelloContract.methods
								 .winnerName()
                       			 .call()
                       			 .then(function (str) {
                           		 console.log(str);
                      		  });
						}
							   );
					*/
});

router.post('/', async function (req, res, next) {
	

	/*
	var vote_num = req.body.vote_btn;
	var vote_address = req.body.address;
	var v =await shelloContract.methods.vote(vote_num).send({from:vote_address, gas:300000});
	console.log (v) ; 
	console.log (typeof(v));
	*/
    
});

module.exports = router;