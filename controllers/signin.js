// /signin --> POST = success/fail
const handleSignin = (req, res, db, bcrypt) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json('incorrect form submission')
    }
    db.select("email", "hash")
      .from("login")
      .where("email", "=", email)
      .then((data) => {
        const isValid = bcrypt.compareSync(password, data[0].hash);
        if (isValid) {
          return db
            .select("*")
            .from("duser")
            .where("email", "=", email)
            .then((user) => {
              res.json(user[0]);
            })
            .catch((err) => res.status(400).json("unable to get the user"+err));
        } else {
          res.status(400).json("worng credentials");
        }
      })
      .catch((err) => res.status(400).json("worng credentials"));
  }

module.exports = {
    handleSignin
}
