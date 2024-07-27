const router = require("express").Router();
const { MySQLClient, sql } = require("../lib/database/client.js");
const MAX_ITEMS = 5;

router.get("/", async (req, res, next) => {
  let keyword = req.query.keyword || "";
  console.log(`Searching for keyword: ${keyword}`); // キーワードをログに出力
  let results;

  try {
    if (keyword) {
      const query = await sql("SELECT_SHOP_LIST_BY_NAME");
      console.log(`SQL Query for searching: ${query}`); // SQLクエリをログに出力
      results = await MySQLClient.executeQuery(
        query,
        [`%${keyword}%`, MAX_ITEMS]
      );
    } else {
      const query = await sql("SELECT_SHOP_HIGH_SCORE_LIST");
      console.log(`SQL Query for high score list: ${query}`); // SQLクエリをログに出力
      results = await MySQLClient.executeQuery(
        query,
        [MAX_ITEMS]
      );
    }

    res.render("./search/list.ejs", { results });
  } catch (err) {
    console.error(err); // エラーをログに出力
    next(err);
  }
});

module.exports = router;
