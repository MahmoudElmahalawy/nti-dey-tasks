const fs = require("fs");
const chalk = require("chalk");

const error = chalk.bold.red;
const success = chalk.bgGreen;

function getClients() {
	let data = fs.readFileSync("./db.json", "utf-8");
	if (!data) return [];
	return JSON.parse(data);
}

function setClients(clients) {
	fs.writeFileSync("./db.json", JSON.stringify(clients));
}

function getClient(id) {
	let clients = getClients();
	return clients.find((client) => client.id == id);
}

// addClient --name=clientName --balance=5000 --isSuspended=false
function addClient(clientData) {
	console.log(clientData);
	// const { name, balance, isSuspended } = clientData;
	if (!(name && balance > 0 && typeof isSuspended === "boolean"))
		return console.log(error("Data supplied is not valid!"));

	let clientId = null;
	let clients = getClients();
	clients.length ? (clientId = clients[clients.length - 1].id + 1) : (clientId = 1);
	let newClient = { id: clientId, name, balance, isSuspended };

	clients.push(newClient);
	setClients(clients);

	console.log(success("Client was added successfully!"));
}

// removeClient --clientId=2
function removeClient({ clientId }) {
	let currentClient = getClient(clientId);
	if (!currentClient) return console.log(error("Client with entered id was not found!"));

	let clients = getClients();
	let clientIndex = clients.findIndex((client) => client.id == clientId);

	clients.splice(clientIndex, 1);
	setClients(clients);

	console.log(success("Client was removed successfully!"));
}

// deposit --clientId=3 --depositAmount=1200
function deposit(depositData) {
	const { clientId, depositAmount } = depositData;
	let currentClient = getClient(clientId);
	if (!currentClient) return console.log(error("Client with entered id was not found!"));
	if (currentClient.isSuspended) return console.log(error("This client is suspended, could not complete deposit!"));
	if (!(0 < depositAmount && depositAmount <= 10000 && typeof depositAmount === "number")) {
		return console.log("Invalid deposit amount!");
	}

	let clients = getClients();
	let clientIndex = clients.findIndex((client) => client.id == clientId);

	clients[clientIndex].balance += depositAmount;
	setClients(clients);

	console.log(success("Deposit completed successfully!"));
}

// withdraw --clientId=3 --withdrawalAmount=1200
function withdraw(withdrawalData) {
	const { clientId, withdrawalAmount } = withdrawalData;
	let currentClient = getClient(clientId);
	if (!currentClient) return console.log(error("Client with entered id was not found!"));
	if (currentClient.isSuspended)
		return console.log(error("This client is suspended, could not complete withdrawal!"));
	if (!(0 < withdrawalAmount && withdrawalAmount <= 5000 && typeof withdrawalAmount === "number")) {
		return console.log(error("Invalid withdrawal amount!"));
	}
	if (currentClient.balance < withdrawalAmount) return console.log(error("Not enough balance!"));

	let clients = getClients();
	let clientIndex = clients.findIndex((client) => client.id == clientId);

	clients[clientIndex].balance -= withdrawalAmount;
	setClients(clients);

	console.log(success("Withdrawal completed successfully!"));
}

// changeSuspendStatus --clientId=2 --suspendStatus=false
function changeSuspendStatus(suspendStatusData) {
	const { clientId, suspendStatus } = suspendStatusData;
	let currentClient = getClient(clientId);
	if (!currentClient) return console.log(error("Client with entered id was not found!"));
	if (!(typeof suspendStatus === "boolean")) return console.log(error("Invalid status value!"));
	if (currentClient.isSuspended === suspendStatus) {
		if (currentClient.isSuspended) {
			return console.log(error("This client is already suspended!"));
		}
		return console.log(error("This client is not suspended!"));
	}

	let clients = getClients();
	let clientIndex = clients.findIndex((client) => client.id == clientId);

	clients[clientIndex].isSuspended = suspendStatus;
	setClients(clients);

	console.log(success("Status updated successfully!"));
}

module.exports = {
	addClient,
	removeClient,
	deposit,
	withdraw,
	changeSuspendStatus,
};
