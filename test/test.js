/* api test */
import logger from '../logger.js'
import DbApi from '../dbapi.js'
const dbapi = new DbApi() //temp

let newCustId = await dbapi.getNext1071Id(1234885)
let sampleBusinessOwnershipMetrics = {
    cust1071Idenitifier: newCustId, 
    statusCode: 2, 
    numPrincipals: 1
}
let sampleOwnerDemographics = {
    cust1071Idenitifier: sampleBusinessOwnershipMetrics.cust1071Idenitifier,
	ofHispanicEthnicity: 1,
	hispanicEthnicityOriginCode: 3,
	hispanicEthnicityOriginOther: '',
	notHispanic: 0,
	doesNotWishToProvideEthnicity: 0,
	genderCode: 2,
	genderOther: '',
	doesNotWishToProvideGender: 0,
	americanIndianAlaskaNative: 0, 
	ofAsianRace: 0,
	asianOriginCode: 0,
	asianOriginOther: '',
	ofBlackRace: 1,
	blackOriginCode: 2,
	blackOriginOther: '',
	ofHawaiianPacificRace: 0,
	hawaiianPacificRaceOrigiCode: 0,
	hawaiianPacificRaceOrigiOther: '',
	ofWhiteRace: 0,
	doesNotWishToProvideRace: 0
}

let result1 = await dbapi.addBusinessOwnershipMetrics(sampleBusinessOwnershipMetrics)
logger.info(result1)
let result2 = await dbapi.addBusinessOwnerDemographics(sampleOwnerDemographics)
logger.info(result1)
logger.info('test commplete')


/*
const sql = require("msnodesqlv8");

// Replace the following parameters with your actual database information.
const server = "AGF-P2GPD-LA";
const database = "registrationDb";
const userName = "AGFIRST\P2GPD";
const password = "11Easterly!";

const connectionString = `Server=${server};Database=${database};UID=${userName};PWD=${password};Driver={SQL Server Native Client 11.0}`;
const query = "SELECT xxx FROM [dbo].[table_name]";

try {
    sql.query(connectionString, query, (err, rows) => {
        if (err) {
            console.log(err);
        } else if (rows) {
            console.log(rows);
        } else {
            res.send("nothing here");
        }
    });
} catch(err) {
    console.log(err)
}
*/
