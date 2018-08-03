'use strict';

const restify = require('restify');
// const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const corsMidWare = require('restify-cors-middleware');

const server = restify.createServer({
    name: 'X Kitchen web API',
    version: '1.0.0'
});

server.use(bodyParser.json());

const cors = corsMidWare({
    origins : ['*'],
    allowHeaders : ['X-App-Version'],
    exposeHeaders : []
})

server.pre(cors.preflight);
server.use(cors.actual);

// server.use(function (req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     res.header("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS, PUT");
//     next();
// });

server.get('/', (req, res, next) => {
    var html = '<html><head><title>Some Title</title></head><body><h1>LiveCode</h1></body></html>';

    res.writeHead(200, {
        'Content-Length': Buffer.byteLength(html),
        'Content-Type': 'text/html'
    })

    res.write(html);
    res.end;
});




/*
/ Route
/ Components Route
*/
// require('./components/categories')(server);
// require('./components/orders')(server);
// require('./components/products')(server);
// require('./components/tables')(server);
// require('./components/users')(server);
//test router
require('./components/controllers/template.controller')(server, 'test');
require('./components/controllers/users.controller')(server,'users');
require('./components/controllers/products.controller')(server,'products');
require('./components/controllers/categories.controller')(server,'categories');
require('./components/controllers/tables.controller')(server, 'tables');
require('./components/controllers/template.controller')(server, 'orders');
require('./components/controllers/template.controller')(server, 'reservations');



global.config = require('./components/configurations/config');


//jwt
// server.get('/api', (req, res, next) => {
//     res.json({
//        message: 'Welcome'
//     });
// });

// server.post('/api/posts', verifyToken, (req, res, next) => {

//    jwt.verify(req.token, 'secretkey', (err, authData) => {
//        if(err){
//            return next(new Error(err));
//        }else{
//            res.json({
//                message: 'Post Created',
//                authData
//             });
//        }
//    });
   
// });

// server.get('/api/posts', verifyToken, (req, res, next) => {

//    jwt.verify(req.token, 'secretkey', (err, authData) => {
//        if(err){
//            return next(new Error(err));
//        }else{
//            res.json({
//                message: 'Post Created',
//                authData
//             });
//        }
//    });
   
// });

// server.post('/api/login', (req, res, next) => {
//    const user = {
//        id: 1,
//        username: 'tisufa',
//        email: 'titus@sentuh.net'
//    }
//    jwt.sign({user}, 'secretkey', (err, token) => {
//        res.json({
//            token
//        });
//    });
// });

/**
* Format Of Token
* Authorization: Bearer <access_token>
* Verify Tokens
*/
// function verifyToken(req, res, next){
//    /**
//     * Get auth header value
//     */
//    const bearerHeader = req.headers['authorization'];
//    // Check if bearer is undefined
//    if(typeof bearerHeader !== 'undefined'){
//        // Split at the space
//        const bearer = bearerHeader.split(' ');
//        // Get token from array
//        const bearerToken = bearer[1];
//        // set the token
//        req.token = bearerToken;
//        // Next middleware
//        next();
//    }else{
//        // FOrbidden
//        res.json({
//            message: 'forbidden'
//        });
//    }
// }


server.listen(config.port, function () {
    console.log('%s listen at %s', server.name, server.url);
});