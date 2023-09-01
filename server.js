const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const knex = require("knex");

const register = require("./controllers/register");
const signin = require("./controllers/signin.js");
const profile = require("./controllers/profile");
const image = require("./controllers/image");
const desist = require("./controllers/desist");


const db = knex({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    user: "postgres",
    password: "089945629",
    database: "cemetery",
  },
});

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  return db
    .select("*")
    .from("duser")
    .then((users) => {
      res.json(users);
    })
    .catch((err) => res.status(400).json("unable to read users"));
});

app.post("/signin",     (req, res)      => signin.handleSignin(req, res, db, bcrypt));
app.post("/register",   (req, res)      => register.handleRegister(req, res, db, bcrypt));
app.get("/profile/:id", (req, res)      => profile.handleProfileGet(req, res, db));
app.put("/image",       (req, res)      => image.handleImage(req, res, db));
app.post("/imageurl",    (req, res)      => image.handleApiCall(req, res));
app.get("/desist/:id", (req, res)      => desist.handleDesistGet(req, res, db));
app.get("/desistAll", (req, res)      => desist.getDesistListAll(req, res, db));
app.get("/desist/serch/:desistTextSerch", (req, res)      => desist.getDesistList(req, res, db));
app.get("/desist/candle/:id", (req, res)      => desist.handleCandleGet(req, res, db));


const serverPort = 3001;
app.listen(serverPort, () => {
  console.log("app is running on port "+serverPort);
});

/*
"road map"
/ --> res = this is working (done)
/signin --> POST = success/fail (done)
/register --> POST = user (done)
/profile/:userId --> get = user (done)
/image --> PUT = user
/

*/
