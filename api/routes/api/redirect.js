const express = require('express');
const router = express.Router();

// Load URL model
const { getShortUrl,getShortUrlById,getShortUrlByLongUrl,addShortUrl,deleteShortUrlById } = require('../../model/dynamo');

router.use((req,res,next) => {
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");
    next();

});  

//  @route GET /api/redirect/test
//  @desc Test Apit end point
//  @access Public
router.get('/test', (req,res) => res.json({msg: 'API is working'}));


//  @route GET /api/redirect
//  @headers hash
//  @desc Redirect user
//  @access Public
router.get('/', async (req,res) => {
    const id = req.headers.id;
    try{
        if(id!=null)
        {
        const shortUrls = await getShortUrlById(id);
        //res.json(shortUrls.longurl);
        res.send({
            data:shortUrls
        })
        }
        else{
            res.send();
        }
   } catch (error) {
       console.error(error);
       res.status(500).json({error: 'Error, please check'});
   }
});

router.get('/shortUrl', async (req,res) => {
    try{
         const shortUrls = await getShortUrl();
         res.json(shortUrls);
    } catch (error) {
        console.error(err);
        res.status(500).json({err: 'Error, please check'});
    }
});

//get short url by id
router.get('/shortUrl/:id', async (req,res) => {
    const id = req.params.id;
    console.log(id);
    try{
         const shortUrls = await getShortUrlById(id);
         res.json(shortUrls);
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Error, please check'});
    }
});

//get short url by long url
router.get('/longUrl/:longurl', async (req,res) => {
    const longurl = req.params.longurl;
    console.log(longurl);
    try{
         const shortUrls = await getShortUrlByLongUrl(longurl);
         res.json(shortUrls);
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Error, please check'});
    }
});



module.exports = router;