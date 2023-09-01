// /profile/:userId --> get = user
const handleProfileGet = (req, res, db) => {
    const { id } = req.params;
    db.select("*")
      .from("duser")
      .where({ id })
      .then((user) => {
        if (user.length) {
          res.json(user[0]);
        } else {
          res.status(400).json("not found");
        }
        })
        .catch((err) => res.status(400).json("error geting user"));
}

module.exports = {
    handleProfileGet
}