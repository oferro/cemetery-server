
//web api (FACE_DETECT_MODEL)
const Clarifai = require ('clarifai');

// Clarifai apikey
const app = new Clarifai.App({
    apiKey: "7ca11fc9615e43b79148ba6a8375064d",
  });

const handleApiCall = (req,res) => {
    app.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data => {
        res.json(data);
    })
    .catch(err => res.status(400).json('anable to work with API'));  
}

// /image --> PUT = user
const handleImage = (req, res, db) => {
    const { id } = req.body;
    db("users")
      .where("id", "=", id)
      .increment("entries", 1)
      .returning("entries")
      .then((entries) => {
        res.json(entries[0]);
      })
      .catch((err) => res.status(400).json("unable to get the entries"));
  }

module.exports = {
    handleImage,
    handleApiCall
}