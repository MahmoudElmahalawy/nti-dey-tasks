const express = require("express");
const router = express.Router();

const {
	getClients,
	getClient,
	removeClient,
	addClient,
	deposit,
	withdraw,
} = require("../controllers/client.controllers");

router.get("/", (req, res) => {
	res.render("index", { title: "All Clients", clientsList: getClients() });
});

router.get("/add", (req, res) => {
	res.render("add", { title: "Add Client" });
});

router.post("/add", (req, res) => {
	addClient(req.body);
	res.redirect("/");
});

router.get("/edit/:id", (req, res) => {
	res.render("edit", { title: "Edit Client" });
});

router.get("/deposit/:id", (req, res) => {
	let client = getClient(req.params.id);
	let formAction = `deposit/${req.params.id}`;
	res.render("deposit", {
		title: "Deposit",
		formAction,
		btnAction: "Deposit",
		clientName: client.name,
	});
});

router.post("/deposit/:id", (req, res) => {
	deposit({ clientId: req.params.id, depositAmount: req.body.depositAmount });
	res.redirect("/");
});

router.get("/withdraw/:id", (req, res) => {
	let client = getClient(req.params.id);
	let formAction = `withdraw/${req.params.id}`;
	res.render("withdraw", {
		title: "Withdraw",
		formAction,
		btnAction: "Withdraw",
		clientName: client.name,
	});
});

router.post("/withdraw/:id", (req, res) => {
	withdraw({ clientId: req.params.id, withdrawalAmount: req.body.withdrawalAmount });
	res.redirect("/");
});

router.get("/delete/:id", (req, res) => {
	removeClient(req.params.id);
	res.redirect("/");
});

module.exports = router;
