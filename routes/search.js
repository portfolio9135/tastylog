const router = require("express").Router();
const { MySQLClient, sql } = require("../lib/database/client.js");
const MAX_ITEMS = 5;

router.get("/", async (req, res, next) => {
  let keyword = req.query.keyword || "";
  let results;

  try {
    if (keyword) {
      const query = await sql("SELECT_SHOP_LIST_BY_NAME");
      results = await MySQLClient.executeQuery(
        query,
        [`%${keyword}%`, MAX_ITEMS]
      );
    } else {
      const query = await sql("SELECT_SHOP_HIGH_SCORE_LIST");
      results = await MySQLClient.executeQuery(
        query,
        [MAX_ITEMS]
      );
    }

    res.render("./search/list.ejs", {
      keyword,
      results
    });
  } catch (err) {
    console.error(err); // エラーをログに出力
    next(err);
  }
});

module.exports = router;
