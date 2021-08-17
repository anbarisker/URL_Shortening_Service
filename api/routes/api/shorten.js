const express = require("express");
const router = express.Router();
const uniqid = require("uniqid");

// Load URL model
const {
  getShortUrl,
  getShortUrlById,
  getShortUrlByLongUrl,
  addShortUrl,
  deleteShortUrlById,
} = require("../../model/dynamo");

router.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

//  @route GET /api/shorten/test
//  @desc Test Apit end point
//  @access Public
router.get("/test", (req, res) => res.json({ msg: "API is working" }));

//  @route Post /api/shorten
//  @desc Post a URL to shorten
//  @access Public
router.post("/", async (req, res) => {
  const shortUrl = req.body;
  //shortUrl.id = uniqid();
  if (shortUrl.longurl) {
    url = shortUrl.longurl;
  }
  console.log("URL is : ", url);
  // Check if the URL exist in DB
  try {
    const shortUrls = await getShortUrlByLongUrl(url);
    if (shortUrls.Count == 0) {
      const newShortUrl = await addShortUrl(shortUrl);
      //res.json(newShortUrl);
      if (newShortUrl == "ConditionalCheckFailedException") {
        console.log("Short URL ID already exist");
      } else {
        res.send({
          data: shortUrl,
        });
      }
    } else {
      res.end();
      console.log("This url already exist in DB");
    }
    //const newShortUrl = await addShortUrl(shortUrl);
    //res.json(newShortUrl);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error, please check" });
  }
});

module.exports = router;
