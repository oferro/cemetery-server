// /register --> POST = user
const handleRegister = (req, res, db, bcrypt) => {
    const { email, password, forename, sorname, phone } = req.body;
    console.log(email +" - " +password +" - " +forename +" - " +sorname +" - " +phone);
    if (!email || !password || !forename) {
        return res.status(400).json('incorrect form submission')
    }
    const hash = bcrypt.hashSync(password, 10);
    db.transaction((trx) => {
      trx
        .insert({
          hash: hash,
          email: email,
        })
        .into("login")
        .returning("email")
        .then((loginEmail) => {
          return trx("duser")
            .returning("*")
            .insert({
              email: loginEmail[0],
              forename: forename,
              sorname: sorname,
              phone: phone
            })
            .then((user) => {
              res.json(user[0]);
            });
        })
        .then(trx.commit)
        .catch(trx.rollback);
    }).catch((err) => res.status(400).json("Unable to register"+err));
  };

module.exports = {
    handleRegister
}