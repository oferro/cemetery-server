
// /deist/:desistId --> get = desist
const handleDesistGet = (req, res, db) => {
  const { id } = req.params;
  db.select("*")
    .from("desist")
    .where({ id , active: true})
    .then((desistGet) => {
      if (desistGet.length) {
        res.json(desistGet[0]);
      } else {
        res.status(400).json("not found");
      }
      })
    .catch((err) => res.status(400).json("error geting desist"));
}

// /desist/candle/:id --> get desist/candles
const handleCandleGet = (req, res, db) => {
  const { desistid } = req.params;
  db.select("*")
    .from("candle")
    .where({ desistid , active: true })
    .then((candleGet) => {
      if (candleGet.length) {
        res.json(candleGet);
      } else {
        res.status(400).json("not found " + desistid);
      }
      })
    .catch((err) => res.status(400).json("error geting desist Candles " + desistid));
}

// /desist/serch/:desistTextSerch --> get desist with select
const getDesistList = (req, res, db) => {
  const {desistTextSerch} = req.params;
  db.select("id","forename","sorname")
    .from("desist")
    .where({active: true})
    .andWhere('forename', 'like', `%${desistTextSerch}%`)
    .then((desistList) => {
      if (desistList.length) {
        res.json(desistList);
      } else {
        res.status(400).json("NOT FOUND");
      }
    })
    .catch((ERR) => res.status(400).json("error geting desist list ", desistTextSerch));
}

// /desistAll --> get desist with select
const getDesistListAll = (req, res, db) => {
  db.select("id","forename","sorname")
    .from("desist")
    .where({active: true})
    .then((desistList) => {
      if (desistList.length) {
        res.json(desistList);
      } else {
        res.status(400).json("NOT FOUND");
      }
    })
    .catch((ERR) => res.status(400).json("error geting all desist list"));
}

module.exports = {
    handleDesistGet,
    handleCandleGet,
    getDesistList,
    getDesistListAll
}