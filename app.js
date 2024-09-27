/* routes */
import express from 'express'
import {port} from './config.js'
import logger from './logger.js'
import {AGF1071APIKEY} from './config.js'
import ip from 'ip'
import DbApi from './dbapi.js'
const dbapi = new DbApi() 
const app = express('testname');

// a function to authenticate requests
const authentication = function (req, res, next) {
    if (req) {
        const clientApiKey = req.get('AGF1071APIKEY')
        logger.info(`authenticating [ ${req.method} ${req.url} - request from ${req.ip}`)
        if (clientApiKey === AGF1071APIKEY)
            next()
        else {
            logger.info(`authentication failure [ ${req.method} ${req.url} - request from ${req.ip}`)
            res.status(401).json({ message: 'authentication failure' });
        }
    }
}

//setup middleware
app.use(authentication)
app.use(express.json())

/* ../custid route handler */
app.get("/custid", async (req, res) => {
    logger.info( "/custid called")
    const newCustId = await dbapi.getNext1071Id(req.body.loanNumber)
    res.json({ cust1071Indentifier:newCustId, loanNumber: req.body.loanNumber }).status(200);
})

/* ../metrics route handler */
app.post("/metrics", async (req, res) => {
    logger.info( "/metrics called")
    try {
        const status = await dbapi.addBusinessOwnershipMetrics(req.body)
        if (status)
            res.json({message: `metrics added for ${req.body.cust1071Idenitifier}`}).status(200)
        else { 
            res.json({message: `metrics not added for ${req.body.cust1071Idenitifier}`}).status(500)
        }
    } catch(exception) {    
        const error = new Error(exception);
        res.json({message: `metrics not added for ${req.body.cust1071Idenitifier} - ${error.message}`}).status(500)
    }
})

/* ../owners route handler */
app.post("/owners", async (req, res) => {
    logger.info( "/owners called")
    try {
        const status = await dbapi.addBusinessOwnerDemographics(req.body)
        if (status)
            res.json({message: `owner demographics added for ${req.body.cust1071Idenitifier}`}).status(200)
        else { 
            res.json({message: `owner demographics not added for ${req.body.cust1071Idenitifier}`}).status(500)
        }
    } catch(exception) {    
        const error = new Error(exception);
        res.json({message: `owner demographics not added for ${req.body.cust1071Idenitifier} - ${error.message}`}).status(500)
    }
})

app.listen(parseInt(port, 10), () => {
    logger.info(`Listening on http://${ip.address()}:${port}`);
})

export { app as default}