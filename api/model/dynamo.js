const AWS =require('aws-sdk');
const nodemon = require('nodemon');
require('dotenv').config();

AWS.config.update({
    region: process.env.AWS_DEFAULT_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

const dynamoClient = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = "shortUrl";


async function  getShortUrl() {
    const params = {
        TableName: TABLE_NAME
    };
    const shortUrl = await dynamoClient.scan(params).promise();
    console.log(shortUrl);
    return shortUrl;
};

const getShortUrlById = async (id) => {
    const params = {
        TableName: TABLE_NAME,
        Key: {
            id
        }
    }
    return await dynamoClient.get(params).promise();
}

const getShortUrlByLongUrl = async (longUrl) => {
    const params = {
        TableName: TABLE_NAME,
        FilterExpression: "contains(longurl, :urls)",
        ExpressionAttributeValues: {
            ":urls" : longUrl,
        }
       
    }
    return await dynamoClient.scan(params).promise();
};

const addShortUrl = async (shortUrl) => {
    const params = {
        TableName: TABLE_NAME,
        Item: {
            id: shortUrl.id,
            longurl: shortUrl.longurl,
            createddate: shortUrl.createddate
        },
        ReturnValues: 'ALL_OLD',
        // ExpressionAttributeValue: AWS.DynamoDB.Converter.marshall({
        //      ":longurl" : shortUrl.longUrl,
        //  }),
        ConditionExpression: 'attribute_not_exists(id)'
        // UpdateExpression: "SET longurl = :longurl"
    }
    try{
        return conditionalUpdateResponse = await dynamoClient.put(params).promise();
        // return conditionalUpdateResponse = await dynamoClient.put(params, (err, data) => {
        //     if (err) {
        //         console.error('Error: ', JSON.stringify(err, null, 2));                
        //     } else {
        //         console.log('Successfully retrieved item:', JSON.stringify(data));
        //     }
        // });
    } catch (error ) {
        if (error.code === 'ConditionalCheckFailedException') {
            console.error('Unable to insert, please check if item exist');
            return error.code;
        }else{
        console.error(error);
        }
    }
   
};

const deleteShortUrlById = async (id) => {
    const params = {
        TableName: TABLE_NAME,
        Key: {id}
    }
    return await dynamoClient.delete(params).promise();
}

// const urlObject = {
//     "id":"fb",
//     "url":"www.facebook.com",
//     "createddate": new Date().toISOString()
// };

// addOrUpdateShortUrl(urlObject);

//getShortUrl();


module.exports = {
    dynamoClient,
    getShortUrl,
    getShortUrlById,
    getShortUrlByLongUrl,
    addShortUrl,
    deleteShortUrlById
    
}