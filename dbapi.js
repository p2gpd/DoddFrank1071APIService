import {conn} from './config.js'
import logger from './logger.js'

class DbApi {
    constructor(){}
    addBusinessOwnershipMetrics = async function (businessOwnershipMetrics) {
        try {
            let data = await new Promise((resolve, reject)=>
                conn.connect().then(() => {
                    return conn.query`insert into regulationDb.dbo.CustomerBusinessOwnership (cust1071Idenitifier, 
                                    businessOwnershipStatusId, numberOfPrincipalOwners)
                                    values (${businessOwnershipMetrics.cust1071Idenitifier},
                                    ${businessOwnershipMetrics.statusCode}, ${businessOwnershipMetrics.numPrincipals})`
                }).then(result => {
                    if (result.rowsAffected[0])
                        resolve(true)
                    else   
                        reject(false)
                }).catch(err => {
                if (err) reject(err) 
                })
            )
            conn.close()
            return data
        } catch (error) {
            throw error
        }
    }
    addBusinessOwnerDemographics = async function (ownerDemographics) {
        try {
            let data = await new Promise((resolve, reject)=>
                conn.connect().then(() => {
                    return conn.query`insert into regulationDb.dbo.CustomerBusinessOwnersDemographics 
                    (cust1071Idenitifier, ofHispanicEthnicity, hispanicEthnicityOriginCode, 
                        hispanicEthnicityOriginOther, notHispanic, doesNotWishToProvideEthnicity, 
                        genderCode, genderOther, doesNotWishToProvideGender, americanIndianAlaskaNative, 
                        ofAsianRace, asianOriginCode, asianOriginOther, ofBlackRace, blackOriginCode, 
                        blackOriginOther, ofHawaiianPacificRace, hawaiianPacificRaceOriginCode  , 
                        hawaiianPacificRaceOriginOther, ofWhiteRace, doesNotWishToProvideRace) values (
                        ${ownerDemographics.cust1071Idenitifier}, ${ownerDemographics.ofHispanicEthnicity}, 
                        ${ownerDemographics.hispanicEthnicityOriginCode}, ${ownerDemographics.hispanicEthnicityOriginOther}, 
                        ${ownerDemographics.notHispanic}, ${ownerDemographics.doesNotWishToProvideEthnicity},
                        ${ownerDemographics.genderCode}, ${ownerDemographics.genderOther}, ${ownerDemographics.doesNotWishToProvideGender},
                        ${ownerDemographics.americanIndianAlaskaNative}, ${ownerDemographics.ofAsianRace}, ${ownerDemographics.asianOriginCode},
                        ${ownerDemographics.asianOriginOther}, ${ownerDemographics.ofBlackRace}, ${ownerDemographics.blackOriginCode},
                        ${ownerDemographics.blackOriginOther}, ${ownerDemographics.ofHawaiianPacificRace}, 
                        ${ownerDemographics.hawaiianPacificRaceOriginCode}, ${ownerDemographics.hawaiianPacificRaceOriginOther},
                        ${ownerDemographics.ofWhiteRace}, ${ownerDemographics.doesNotWishToProvideRace})`
                }).then(result => {
                    if (result.rowsAffected[0])
                        resolve(true)
                    else   
                        reject(false)
                }).catch(err => {
                if (err) reject(err) 
                })
            )
            conn.close()
            return data
        } catch (error) {
            throw error
        }
    }
    getNext1071Id = async function(loanNumber) {
        try {
            let data = await new Promise((resolve, reject)=>
                conn.connect().then(() => {
                    return conn.query`DECLARE @customerIdentifier varchar(100);EXEC 
                                                regulationDb.[dbo].getNext1071Id @loanNumber = ${loanNumber}, 
                                                @customerIdentifier = @customerIdentifier OUTPUT`
                }).then(result => {
                    logger.info(`getNext1071Id: returned ${result.recordset[0]['']}`)
                    resolve(result.recordset[0][''])
                }).catch(err => {
                if (err) {
                    logger.error(err)
                        reject(err)
                    } 
                })
            )
            conn.close()
            return data
        } catch (error) {
            logger.error(error)
            throw error
        }
    }
}
export { DbApi as default}