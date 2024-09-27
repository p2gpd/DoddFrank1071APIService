/* db api test */
import logger from '../logger.js'
import DbApi from '../dbapi.js'

const dbapi = new DbApi() 

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

let genders = await dbapi.getGenderLookupData()
logger.info(genders)

let hispanicLookupData = await dbapi.getHispanicOriginLookupData()
logger.info(hispanicLookupData)

let asianLookupData = await dbapi.getAsianOriginLookupData()
logger.info(asianLookupData)

let blackLookupData = await dbapi.getBlackOriginLookupData()
logger.info(blackLookupData)

let hawaiianPacificLookupData = await dbapi.getBlackOriginLookupData()
logger.info(hawaiianPacificLookupData)

let allLookupData = await dbapi.getAllLookupData()
logger.info(allLookupData)

let result1 = await dbapi.addBusinessOwnershipMetrics(sampleBusinessOwnershipMetrics)
logger.info(result1)

let result2 = await dbapi.addBusinessOwnerDemographics(sampleOwnerDemographics)
logger.info(result2)
logger.info('test commplete')
