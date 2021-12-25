 var cur_address;
const contract_address = '0xB2Ad083a44bEb48417Fe93Ea1FaD8FDf53D155e9';

window.onload = async function () {
    // import detectEthereumProvider from '@metamask/detect-provider';
   
    const provider = await detectEthereumProvider();
    if (provider) {
        startApp(provider); // Initialize your app
    } else {
        console.log('Please install MetaMask!');
    }

    function startApp(provider) {
        // If the provider returned by detectEthereumProvider is not the same as
        // window.ethereum, something is overwriting it, perhaps another wallet.
        if (provider !== window.ethereum) {
            console.error('Do you have multiple wallets installed?');
        }
        // Access the decentralized web!
    }

    /**********************************************************/
    /* Handle chain (network) and chainChanged (per EIP-1193) */
    /**********************************************************/

    const chainId = await ethereum.request({ method: 'eth_chainId' });
    handleChainChanged(chainId);

    ethereum.on('chainChanged', handleChainChanged);

    function handleChainChanged(_chainId) {
        // We recommend reloading the page, unless you must do otherwise
        console.log('handleChainChanged!');
        // /  window.location.reload();
    }

    /***********************************************************/
    /* Handle user accounts and accountsChanged (per EIP-1193) */
    /***********************************************************/

    let currentAccount = null;
    ethereum
        .request({ method: 'eth_accounts' })
        .then(handleAccountsChanged)
        .catch((err) => {
            // Some unexpected error.
            // For backwards compatibility reasons, if no accounts are available,
            // eth_accounts will return an empty array.
            console.error(err);
        });

    // Note that this event is emitted on page load.
    // If the array of accounts is non-empty, you're already
    // connected.
    ethereum.on('accountsChanged', handleAccountsChanged);

    // For now, 'eth_accounts' will continue to always return an array
    function handleAccountsChanged(accounts) {
        if (accounts.length === 0) {
            // MetaMask is locked or the user has not connected any accounts
            console.log('Please connect to MetaMask.');
        } else if (accounts[0] !== currentAccount) {
            currentAccount = accounts[0];
            // Do any other work!
			cur_address = currentAccount;
            document.getElementById('address').innerHTML = currentAccount;
        }
    }

    /*********************************************/
    /* Access the user's accounts (per EIP-1102) */
    /*********************************************/

    // You should only attempt to request the user's accounts in response to user
    // interaction, such as a button click.
    // Otherwise, you popup-spam the user like it's 1999.
    // If you fail to retrieve the user's account(s), you should encourage the user
    // to initiate the attempt.
    var btn = document.getElementById('connectButton');
    btn.addEventListener('click', (event) => {
        connect();
    });
    // While you are awaiting the call to eth_requestAccounts, you should disable
    // any buttons the user can click to initiate the request.
    // MetaMask will reject any additional requests while the first is still
    // pending.

    function connect() {
        ethereum
            .request({ method: 'eth_requestAccounts' })
            .then(handleAccountsChanged)
            .catch((err) => {
                if (err.code === 4001) {
                    // EIP-1193 userRejectedRequest error
                    // If this happens, the user rejected the connection request.
                    console.log('Please connect to MetaMask.');
                } else {
                    console.error(err);
                }
            });
    }

	
   
};
function vote_function(elem){
	//	alert(elem.value);
	var person_num = parseInt(elem.value.toString()[0]);
	console.log (person_num);
	console.log (--person_num);
	
		var vote_data = '0x0121b93f0000000000000000000000000000000000000000000000000000000000000000';
		vote_data = vote_data.substring(0, vote_data.length-1) + person_num.toString();

	alert('0x0121b93f0000000000000000000000000000000000000000000000000000000000000001' == vote_data);


	
	console.log (vote_data); 
	
	ethereum
    .request({
      method: 'eth_sendTransaction',
      params: [
        {
          from: cur_address,
          to: contract_address,
			 data: vote_data,
          value: '0x0',
        //  gasPrice: '0x1184e72a000',
          gas: '30000',
        },
      ],
    })
    .then((txHash) => console.log(txHash))
    .catch((error) => console.error);


	}
/*
	  ethereum
    .request({
      method: 'eth_sendTransaction',
      params: [
        {
          from: '0xe20201278066E9B0BeBAd7Fc2e718DFE2745CFdf',
          to: '0xF4fD4EBfb6b4131B4Df465C0b3F3538EA1Aa7bFa',
			 data:
      '0x0121b93f0000000000000000000000000000000000000000000000000000000000000001',
          value: '0x0',
        //  gasPrice: '0x1184e72a000',
          gas: '30000',
        },
      ],
    })
    .then((txHash) => console.log(txHash))
    .catch((error) => console.error);
	*/