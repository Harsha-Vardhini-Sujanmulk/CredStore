const express = require("express");
const { faker } = require("@faker-js/faker");
const mysql = require("mysql2");
const app = express();
const path = require("path");
const methodOverride = require("method-override");
const { v4: uuidv4 } = require("uuid");

app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

let getUser = () => {
	return [
		faker.datatype.uuid(),
		faker.internet.userName(),
		faker.internet.email(),
		faker.internet.password(),
	];
};

let connection = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "21NN1A0559",
	database: "delta_app",
});
// count of total no.of users
app.get("/", (req, res) => {
	let q = `SELECT count(*) FROM user`;
	try {
		connection.query(q, (err, result) => {
			if (err) throw err;
			let count = result[0]["count(*)"];
			res.render("home.ejs", { count });
		});
	} catch (err) {
		res.send("some error occurred");
	}
});
// All users data
app.get("/user", (req, res) => {
	let q = `SELECT * FROM user`;
	try {
		connection.query(q, (err, result) => {
			if (err) throw err;
			let data = result;
			res.render("showusers.ejs", { data });
		});
	} catch (err) {
		res.send("some error occurred");
	}
});

/****************** Get & Patch *******************/
// EDIT username
app.get("/user/:id/edit", (req, res) => {
	let { id } = req.params;
	let q = `SELECT * FROM user WHERE id='${id}'`;

	try {
		connection.query(q, (err, result) => {
			if (err) throw err;
			let user = result[0];
			res.render("edit.ejs", { user });
		});
	} catch (err) {
		res.send("some error with DB");
	}
});
// UPDATE username
app.patch("/user/:id", (req, res) => {
	let { id } = req.params;
	let { username, password } = req.body;
	console.log(username);
	let q = `SELECT * FROM user WHERE id='${id}'`;

	try {
		connection.query(q, (err, result) => {
			if (err) throw err;
			let user = result[0];

			if (user.password != password) {
				res.send("WRONG Password entered!");
			} else {
				let q2 = `UPDATE user SET username='${username}' WHERE id='${id}'`;
				connection.query(q2, (err, result) => {
					if (err) throw err;
					else {
						console.log(result);
						console.log("updated!");
						res.redirect("/user");
					}
				});
			}
		});
	} catch (err) {
		res.send("some error with DB");
	}
});
/****************** Get & Patch *******************/

/****************** Get & Post *******************/
// ADD new user
app.get("/user/new", (req, res) => {
	res.render("new-user.ejs");
});
// UPDATE new user in the DB
app.post("/user/new", (req, res) => {
	let { username, email, password } = req.body;
	let id = uuidv4();
	//Query to Insert New User
	let q = `INSERT INTO user (id, username, email, password) VALUES ('${id}','${username}','${email}','${password}') `;

	try {
		connection.query(q, (err, result) => {
			if (err) throw err;
			console.log("added new user");
			res.redirect("/user");
		});
	} catch (err) {
		res.send("some error occurred");
	}
});
/****************** Get & Post *******************/

/****************** Get & Delete *******************/
// DELETE user
app.get("/user/:id/delete", (req, res) => {
	let { id } = req.params;
	let q = `SELECT * FROM user WHERE id='${id}'`;

	try {
		connection.query(q, (err, result) => {
			if (err) throw err;
			let user = result[0];
			console.log(user);
			res.render("delete-user.ejs", { user });
		});
	} catch (err) {
		res.send("some error with DB");
	}
});

app.delete("/user/:id/", (req, res) => {
	let { id } = req.params;
	let { password } = req.body;
	let q = `SELECT * FROM user WHERE id='${id}'`;

	try {
		connection.query(q, (err, result) => {
			if (err) throw err;
			let user = result[0];

			if (user.password != password) {
				res.send("WRONG Password entered!");
			} else {
				let q2 = `DELETE FROM user WHERE id='${id}'`; //Query to Delete
				connection.query(q2, (err, result) => {
					if (err) throw err;
					else {
						console.log(result);
						console.log("deleted!");
						res.redirect("/user");
					}
				});
			}
		});
	} catch (err) {
		res.send("some error with DB");
	}
});
/****************** Get & Delete *******************/

app.listen("8080", () => {
	console.log("server running on port 8080");
});
