// Assignment address: 0x079037A7B84Bcd03095444DA972D5a3b91aDADFa
// Contract address: 0xcF469d3BEB3Fc24cEe979eFf83BE33ed50988502

const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const Web3 = require("web3");
const dotenv = require("dotenv");
const fs = require("fs");

dotenv.config();

const goerliEndpoint = process.env.GOERLI_URL;

const web3 = createAlchemyWeb3(goerliEndpoint);

// Imposta l'indirizzo del contratto Assignment sulla rete Goerli
const assignmentContractAddress = "0x079037A7B84Bcd03095444DA972D5a3b91aDADFa";

// Imposta l'ABI del contratto Assignment
const assignmentContractABIPath = "artifacts/contracts/Assignment.sol/Assignment.json";
const assignmentContractABI = JSON.parse(fs.readFileSync(assignmentContractABIPath, "utf8").toString()).abi;

// Crea un'istanza del contratto Assignment
const assignmentContract = new web3.eth.Contract(assignmentContractABI, assignmentContractAddress);

// Imposta l'account che invierà la transazione
const senderAddress = "0xB430d748c4961A567A484B107e4fb822b42A6b9C";
const privateKey = process.env.PRIVATE_KEY;

// Funzione per chiamare la funzione "attempt" del contratto Assignment
async function callAttemptFunction() {
  const senderAccount = web3.eth.accounts.privateKeyToAccount(privateKey);
  const nonce = await web3.eth.getTransactionCount(senderAddress);
  const gasPrice = await web3.eth.getGasPrice();

  const targetAddress = "0xcF469d3BEB3Fc24cEe979eFf83BE33ed50988502"
  const functionData = assignmentContract.methods.attempt(targetAddress).encodeABI();

  const transactionObject = {
    from: senderAddress,
    to: assignmentContractAddress,
    gas: 200000, // Imposta la quantità di gas necessaria in base alle esigenze del tuo contratto
    gasPrice: gasPrice,
    nonce: nonce,
    data: functionData,
  };

  const signedTransaction = await web3.eth.accounts.signTransaction(transactionObject, privateKey);
  const transactionReceipt = await web3.eth.sendSignedTransaction(signedTransaction.rawTransaction);

  console.log("Transaction Receipt:", transactionReceipt);
}

// Chiama la funzione "callPippoFunction"
callAttemptFunction();

