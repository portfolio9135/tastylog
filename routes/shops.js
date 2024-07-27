const router = require("express").Router();
const { MySQLClient, sql } = require("../lib/database/client.js");

router.get("/:id", async (req, res, next) => {
  let id = req.params.id;

  try {
    const shopDetailsPromise = MySQLClient.executeQuery(
      await sql("SELECT_SHOP_DETAIL_BY_ID"),
      [id]
    );
    const shopReviewsPromise = MySQLClient.executeQuery(
      await sql("SELECT_SHOP_REVIEW_BY_SHOP_ID"),
      [id]
    );

    const [shopDetails, shopReviews] = await Promise.all([shopDetailsPromise, shopReviewsPromise]);

    console.log("Shop Details:", shopDetails);
    console.log("Shop Reviews:", shopReviews);

    if (!shopDetails.length) {
      throw new Error(`Shop with id ${id} not found`);
    }

    let data = shopDetails[0];
    data.reviews = shopReviews || [];

    res.render("./shops/index.ejs", data);
  } catch (err) {
    console.error("Error fetching shop details or reviews:", err);
    next(err);
  }
});

module.exports = router;
