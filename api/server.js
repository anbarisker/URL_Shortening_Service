//Require
const express = require('express');
//Init
const app = express();
//For Josn
app.use(express.json());

//Database methods
const {getShortUrlById } = require('./model/dynamo');

// Routes
const shorten = require('./routes/api/shorten');
app.use('/api/shortenUrl', shorten); //api/shorten/

const redirect = require('./routes/api/redirect');
app.use('/api/redirectUrl', redirect); //api/redirect/


// e.g. localhost:5000/1234
app.get('/:id', async (req,res) =>{
    const id = req.params.id;//1234
    console.log(id);//1234
    try{
        const shortUrls = await getShortUrlById(id)
        //res.redirect('http://' + shortUrls.Item.longurl);
        res.redirect(shortUrls.Item.longurl);
        //  getShortUrlById(id).then((shortUrls) => {
        //     console.log(shortUrls.Item.longurl);
        //     res.redirect('http://' + shortUrls.Item.longurl);
        //  }).catch((error)=> {    
        //      return res.redirect('/');
        //  });
        
   } catch (error) {
    res.redirect('/');
    console.log('This url does not exist');
   }
});

app.get('/', (req,res) => {
    res.send('Hello Anba');
});


// Port
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log('listening on port : ' + port);
})