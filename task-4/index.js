const path = require("path");
const express = require("express");
const hbs = require("hbs");

const userRoutes = require("./routes/client.routes");

const app = express();

app.set("view engine", "hbs");
hbs.registerPartials(path.join(__dirname, "/views/partials/")); // <-- __dirname + "/views/partials/"

app.use(express.urlencoded({ extended: true }));

app.use(userRoutes);

app.listen(3000, () => {
	console.log("Server is up and running at http://localhost:3000");
});
