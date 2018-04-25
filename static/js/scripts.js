// Set the local ganache-cli chain as the local Web3 provider.
web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
//web3 = new Web3(web3.currentProvider);
web3.eth.defaultAccount = web3.eth.accounts[0];

// Connect to and read our deployed Athlete contract.
var AthleteContract = web3.eth.contract([
    {
      "constant": true,
      "inputs": [
        {
          "name": "_athleteId",
          "type": "uint256"
        }
      ],
      "name": "level",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_athleteId",
          "type": "uint256"
        }
      ],
      "name": "levelUp",
      "outputs": [],
      "payable": true,
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_athleteId",
          "type": "uint256"
        },
        {
          "name": "_kittyId",
          "type": "uint256"
        }
      ],
      "name": "feedOnKitty",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "_athleteId",
          "type": "uint256"
        }
      ],
      "name": "winCount",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "athleteToOwner",
      "outputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "_athleteId",
          "type": "uint256"
        }
      ],
      "name": "lossCount",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [],
      "name": "withdraw",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "_athleteId",
          "type": "uint256"
        }
      ],
      "name": "getDefRating",
      "outputs": [
        {
          "name": "",
          "type": "uint16"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_address",
          "type": "address"
        }
      ],
      "name": "setKittyContractAddress",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_athleteId",
          "type": "uint256"
        },
        {
          "name": "_newDna",
          "type": "uint256"
        }
      ],
      "name": "changeDna",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "_athleteId",
          "type": "uint256"
        }
      ],
      "name": "getName",
      "outputs": [
        {
          "name": "",
          "type": "string"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "_athleteId",
          "type": "uint256"
        }
      ],
      "name": "getOffRating",
      "outputs": [
        {
          "name": "",
          "type": "uint16"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "_owner",
          "type": "address"
        }
      ],
      "name": "getAthletesByOwner",
      "outputs": [
        {
          "name": "",
          "type": "uint256[]"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_name",
          "type": "string"
        }
      ],
      "name": "createRandomAthlete",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_athleteId",
          "type": "uint256"
        },
        {
          "name": "_newName",
          "type": "string"
        }
      ],
      "name": "changeName",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_fee",
          "type": "uint256"
        }
      ],
      "name": "setLevelUpFee",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_name",
          "type": "string"
        },
        {
          "name": "_name2",
          "type": "string"
        }
      ],
      "name": "buyPackAthletes",
      "outputs": [],
      "payable": true,
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_athleteId",
          "type": "uint256"
        },
        {
          "name": "_targetId",
          "type": "uint256"
        }
      ],
      "name": "attack",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "name": "ownerAthleteCount",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "athletes",
      "outputs": [
        {
          "name": "name",
          "type": "string"
        },
        {
          "name": "dna",
          "type": "uint256"
        },
        {
          "name": "level",
          "type": "uint32"
        },
        {
          "name": "readyTime",
          "type": "uint32"
        },
        {
          "name": "winCount",
          "type": "uint16"
        },
        {
          "name": "lossCount",
          "type": "uint16"
        },
        {
          "name": "offensiveRating",
          "type": "uint16"
        },
        {
          "name": "defensiveRating",
          "type": "uint16"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "transferOwnership",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "name": "_from",
          "type": "address"
        },
        {
          "indexed": true,
          "name": "_to",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "_tokenId",
          "type": "uint256"
        }
      ],
      "name": "Transfer",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "name": "_owner",
          "type": "address"
        },
        {
          "indexed": true,
          "name": "_approved",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "_tokenId",
          "type": "uint256"
        }
      ],
      "name": "Approval",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "name": "athleteId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "name": "name",
          "type": "string"
        },
        {
          "indexed": false,
          "name": "dna",
          "type": "uint256"
        }
      ],
      "name": "NewAthlete",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "name": "previousOwner",
          "type": "address"
        },
        {
          "indexed": true,
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "OwnershipTransferred",
      "type": "event"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "_owner",
          "type": "address"
        }
      ],
      "name": "balanceOf",
      "outputs": [
        {
          "name": "_balance",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "_tokenId",
          "type": "uint256"
        }
      ],
      "name": "ownerOf",
      "outputs": [
        {
          "name": "_owner",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_to",
          "type": "address"
        },
        {
          "name": "_tokenId",
          "type": "uint256"
        }
      ],
      "name": "transfer",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_to",
          "type": "address"
        },
        {
          "name": "_tokenId",
          "type": "uint256"
        }
      ],
      "name": "approve",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_tokenId",
          "type": "uint256"
        }
      ],
      "name": "takeOwnership",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ]);

var AthleteCoin = AthleteContract.at("0xb9f0a24baccdca17045d99cc8fd04758f53fffd8");
console.log("Successfully loaded" + AthleteCoin.balanceOf(web3.eth.accounts[0]));
console.log("Get Balance" + web3.eth.getBalance(web3.eth.accounts[2]));

var numTokens = AthleteCoin.balanceOf(web3.eth.accounts[2]);
var defaultTokens = AthleteCoin.balanceOf(web3.eth.accounts[1]);

console.log(defaultTokens + "default");
if (defaultTokens <= 0) {
  AthleteCoin.createRandomAthlete("Nick Foles", { from: web3.eth.accounts[1], gas:3000000 });
}

var img = document.createElement("img");
img.src = "/images/nickfoles.jpg";
var src = document.getElementById("nickfoles");
src.appendChild(img);


$("#createButton").click(function() {
//	DexioRegistry._mint(web3.eth.accounts[0], Math.floor(Math.random() * Math.floor(1000000000)));
  if (numTokens > 0) {
    document.getElementById("demo").innerHTML = "Can Only Create One Athlete!";
  } else {
    var name = $('#diamond').val();
	  AthleteCoin.createRandomAthlete(name, { from: web3.eth.accounts[2], gas:3000000 });
  }
});

$("#attackButton").click(function() {
//  DexioRegistry._mint(web3.eth.accounts[0], Math.floor(Math.random() * Math.floor(1000000000)));
  var athleteIDs1 = AthleteCoin.getAthletesByOwner(web3.eth.accounts[2], { from: web3.eth.accounts[2], gas:3000000 });
  var athleteIDFoles = AthleteCoin.getAthletesByOwner(web3.eth.accounts[1], { from: web3.eth.accounts[1], gas:3000000});
  AthleteCoin.attack(athleteIDs1[0], athleteIDFoles[0], { from: web3.eth.accounts[2], gas:3000000});
});

$("#levelUpButton").click(function() {
  var athleteIDs1 = AthleteCoin.getAthletesByOwner(web3.eth.accounts[2], { from: web3.eth.accounts[2], gas:3000000 });
  var val = web3.toWei('.001', 'ether');
  AthleteCoin.levelUp(athleteIDs1[0], { value: val, from: web3.eth.accounts[2], gas:3000000 });  
});

$("#buyPackButton").click(function() { 
  var val = web3.toWei('.080', 'ether');
  AthleteCoin.buyPackAthletes("Kendrick", "Future", { value: val, from: web3.eth.accounts[2], gas:3000000 }); 
});

$("#changeNameButton").click(function() {

  var athleteIDs1 = AthleteCoin.getAthletesByOwner(web3.eth.accounts[2], { from: web3.eth.accounts[2], gas:3000000 });
  var tokenLevel = AthleteCoin.level(athleteIDs1[0], { from: web3.eth.accounts[2], gas:3000000 });

  if (tokenLevel >= 2) {
    var newName = $('#changeName').val();
    AthleteCoin.changeName(athleteIDs1[0], newName, {from: web3.eth.accounts[2], gas:3000000 });
  }
  else {
    document.getElementById("notValidLevel").innerHTML = "Need to be at least level 2 to Change Name!";
  }
});

if (numTokens > 0) {
  var athleteID = AthleteCoin.getAthletesByOwner(web3.eth.accounts[2], { from: web3.eth.accounts[2], gas:3000000 });
  var tokenWins = AthleteCoin.winCount(athleteID[0], { from: web3.eth.accounts[2], gas:3000000});
  var tokenLosses = AthleteCoin.lossCount(athleteID[0], { from: web3.eth.accounts[2], gas:3000000});
  var level = AthleteCoin.level(athleteID[0], { from: web3.eth.accounts[2], gas:3000000 });
  var athleteName = AthleteCoin.getName(athleteID[0], { from: web3.eth.accounts[2], gas:3000000 });
  var offRating = AthleteCoin.getOffRating(athleteID[0], { from: web3.eth.accounts[2], gas:3000000 });
  var defRating = AthleteCoin.getDefRating(athleteID[0], { from: web3.eth.accounts[2], gas:3000000 });

  $("#athletestats").val("Name: " + athleteName + "\n" + "Offensive Rating: " + offRating + "\n" + "Defensive Rating: " + defRating
   + "\n" + "Level: " + level + "\n" + "Wins: " + tokenWins + "\n" + "Losses: " + tokenLosses + "\n");

  if(athleteName == "Tom Brady") {
    var img = document.createElement("img");
    img.src = "/images/tombrady.jpeg";
    var src = document.getElementById("x");

    src.appendChild(img);
  }
  else if (athleteName == "Jared Goff"){
    var img = document.createElement("img");
    img.src = "/images/jaredgoff.jpg";
    var src = document.getElementById("x");

    src.appendChild(img);
  }

  else if (athleteName == "Juju Smith-Schuster"){
    var img = document.createElement("img");
    img.src = "/images/juju.jpeg";
    var src = document.getElementById("x");

    src.appendChild(img);
  }

}

var enemyID = AthleteCoin.getAthletesByOwner(web3.eth.accounts[1], { from: web3.eth.accounts[1], gas:3000000 });
var enemyWins = AthleteCoin.winCount(enemyID[0], { from: web3.eth.accounts[1], gas:3000000});
var enemyLosses = AthleteCoin.lossCount(enemyID[0], { from: web3.eth.accounts[1], gas:3000000});
var enemyLevel = AthleteCoin.level(enemyID[0], { from: web3.eth.accounts[1], gas:3000000 });
var enemyName = AthleteCoin.getName(enemyID[0], { from: web3.eth.accounts[1], gas:3000000 });
var enemyOffRating = AthleteCoin.getOffRating(enemyID[0], { from: web3.eth.accounts[2], gas:3000000 });
var enemyDefRating = AthleteCoin.getDefRating(enemyID[0], { from: web3.eth.accounts[2], gas:3000000 });

$("#enemystats").val("Name: " + enemyName + "\n" + "Offensive Rating: " + enemyOffRating + "\n" + "Defensive Rating: " + 
  enemyDefRating + "\n"+ "Level: " + enemyLevel + "\n" + "Wins: " + enemyWins + "\n" + "Losses: " + enemyLosses + "\n");


console.log("numTokens = " + numTokens);






