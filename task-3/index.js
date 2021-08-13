const yargs = require("yargs");

const { addClient, removeClient, deposit, withdraw, changeSuspendStatus } = require("./client-operations");

yargs
	.command({
		command: "addClient",
		describe: "Adds new client to json file",
		builder: {
			name: {
				demandOption: true,
				describe: "Client's name",
				type: "string",
			},
			balance: {
				demandOption: true,
				describe: "Balance of the client",
				type: "number",
			},
			isSuspended: {
				demandOption: true,
				describe: "Status of the client",
				type: "boolean",
			},
		},
		handler: function (argv) {
			addClient(argv);
		},
	})
	.command({
		command: "removeClient",
		describe: "Removes client from json file",
		builder: {
			clientId: {
				demandOption: true,
				describe: "Client's id to be removed",
				type: "number",
			},
		},
		handler: function (argv) {
			removeClient(argv);
		},
	})
	.command({
		command: "deposit",
		describe: "Adds money amount to selected client's balance",
		builder: {
			clientId: {
				demandOption: true,
				describe: "Client's id to update balance",
				type: "number",
			},
			depositAmount: {
				demandOption: true,
				describe: "Deposit amount to add",
				type: "number",
			},
		},
		handler: function (argv) {
			deposit(argv);
		},
	})
	.command({
		command: "withdraw",
		describe: "Withdraw money from selected client's balance",
		builder: {
			clientId: {
				demandOption: true,
				describe: "Client's id to update balance",
				type: "number",
			},
			withdrawalAmount: {
				demandOption: true,
				describe: "withdrawal amount",
				type: "number",
			},
		},
		handler: function (argv) {
			withdraw(argv);
		},
	})
	.command({
		command: "changeSuspendStatus",
		describe: "Suspend or activate selected client",
		builder: {
			clientId: {
				demandOption: true,
				describe: "Client's id to update status",
				type: "number",
			},
			suspendStatus: {
				demandOption: true,
				describe: "Status to be updated",
				type: "boolean",
			},
		},
		handler: function (argv) {
			changeSuspendStatus(argv);
		},
	});

yargs.argv;
