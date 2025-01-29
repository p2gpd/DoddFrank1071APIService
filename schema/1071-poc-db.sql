/*
 * 1071 poc db
 */

/* create a database */
if exists (select name from sys.databases where (name = 'regulationDb'))
begin
    drop database regulationDb
end
go
create database regulationDb
go

use regulationDb
go



drop table if exists dbo.Registered1071Ids
go
create table Registered1071Ids
(
	id int not null identity(1,1),
    registrationDate datetime not null,
	cust1071Idenitifier varchar(128) not null 
)
go


/* lookup tables */

/* BusinessOwnershipStatusLookup table */
drop table if exists dbo.BusinessOwnershipStatusLookup
go
create table BusinessOwnershipStatusLookup 
(
	id int not null identity(1,1),
	ownershipStatusCode int not null,
	ownershipStatus varchar(255) not null
)
go
insert into BusinessOwnershipStatusLookup (ownershipStatusCode, ownershipStatus) values (1, 'Minority-owned')
go
insert into BusinessOwnershipStatusLookup (ownershipStatusCode, ownershipStatus) values (2, 'Women-owned')
go
insert into BusinessOwnershipStatusLookup (ownershipStatusCode, ownershipStatus) values (3, 'LGBTQI+-owned')
go
insert into BusinessOwnershipStatusLookup (ownershipStatusCode, ownershipStatus) values (4, 'None of these apply')
go
insert into BusinessOwnershipStatusLookup (ownershipStatusCode, ownershipStatus) values (5, 'Does not wish to provide this information')
go

/* genders lookup table */
drop table if exists dbo.Genders
go
create table Genders
(
	id int not null identity(1,1),
	genderCode int not null,
	genderName varchar(255) not null
)
go
insert into Genders (genderCode, genderName) values (1, 'male')
go
insert into Genders (genderCode, genderName) values (2, 'female')
go
insert into Genders (genderCode, genderName) values (3, 'other')
go

/* Hispanic origin lookup table */
drop table if exists dbo.HispanicOrigin
go
create table HispanicOrigin 
(
	id int not null identity(1,1) primary key,
	originCountryCode int not null,
	originCountry varchar(255) not null
)
go
insert into HispanicOrigin (originCountryCode, originCountry) values (1, 'Cuban')
go
insert into HispanicOrigin (originCountryCode, originCountry) values (2, 'Mexican')
go
insert into HispanicOrigin (originCountryCode, originCountry) values (3, 'Puerto Rican')
go
insert into HispanicOrigin (originCountryCode, originCountry) values (4, 'Other')
go

/* Asian race origin lookup table */
drop table if exists dbo.AsianOrigin
go
create table AsianOrigin 
(
	id int not null identity(1,1) primary key,
	originCountryCode int not null,
	originCountry varchar(255) not null
)
go
insert into AsianOrigin (originCountryCode, originCountry) values (1, 'Asian Indian')
go
insert into AsianOrigin (originCountryCode, originCountry) values (2, 'Chinese')
go
insert into AsianOrigin (originCountryCode, originCountry) values (3, 'Filipino')
go
insert into AsianOrigin (originCountryCode, originCountry) values (4, 'Japanese')
go
insert into AsianOrigin (originCountryCode, originCountry) values (5, 'Korean')
go
insert into AsianOrigin (originCountryCode, originCountry) values (6, 'Vietnamese')
go
insert into AsianOrigin (originCountryCode, originCountry) values (7, 'Other')
go

/* Black race origin lookup table */
drop table if exists dbo.BlackOrigin
go
create table BlackOrigin 
(
	id int not null identity(1,1) primary key,
	originCountryCode int not null,
	originCountry varchar(255) not null
)
go
insert into BlackOrigin (originCountryCode, originCountry) values (1, 'African American')
go
insert into BlackOrigin (originCountryCode, originCountry) values (2, 'Ethiopian')
go
insert into BlackOrigin (originCountryCode, originCountry) values (3, 'Hatian')
go
insert into BlackOrigin (originCountryCode, originCountry) values (4, 'Jamaican')
go
insert into BlackOrigin (originCountryCode, originCountry) values (5, 'Nigerian')
go
insert into BlackOrigin (originCountryCode, originCountry) values (6, 'Somali')
go
insert into BlackOrigin (originCountryCode, originCountry) values (7, 'Other')
go

/* Hawaiian-Pacific race origin lookup table */
drop table if exists dbo.HawaiianPacificOrigin
go
create table HawaiianPacificOrigin 
(
	id int not null identity(1,1) primary key,
	originCountryCode int not null,
	originCountry varchar(255) not null
)
go
insert into HawaiianPacificOrigin (originCountryCode, originCountry) values (1, 'Guamanian or Chamorro')
go
insert into HawaiianPacificOrigin (originCountryCode, originCountry) values (2, 'Native Hawaiian')
go
insert into HawaiianPacificOrigin (originCountryCode, originCountry) values (3, 'Somoan')
go
insert into HawaiianPacificOrigin (originCountryCode, originCountry) values (4, 'Other')
go

/* tables for the 1071 required attributes */

/* CustomerBusinessOwnership table */
drop table if exists CustomerBusinessOwnership
go
create table CustomerBusinessOwnership
(
	cust1071Idenitifier varchar(60) not null,
	businessOwnershipStatusId int not null,
	numberOfPrincipalOwners int not null
)
go


/* CustomerBusinessOwnersDemographics table */
/* one row for each owner of the business applying for the loan */
/* CustomerBusinessOwnership:CustomerBusinessOwnersDemographics = 1:M */
drop table if exists dbo.CustomerBusinessOwnersDemographics
go
create table CustomerBusinessOwnersDemographics
(
	cust1071Idenitifier varchar(60) not null,
	ofHispanicEthnicity int,
	hispanicEthnicityOriginCode int,
	hispanicEthnicityOriginOther varchar(20),
	notHispanic int,
	doesNotWishToProvideEthnicity int,
	genderCode int,
	genderOther varchar(20),
	doesNotWishToProvideGender int,
	americanIndianAlaskaNative int, 
	ofAsianRace int,
	asianOriginCode int,
	asianOriginOther varchar(20),
	ofBlackRace varchar(20),
	blackOriginCode int,
	blackOriginOther varchar(20),
	ofHawaiianPacificRace int,
	hawaiianPacificRaceOriginCode int,
	hawaiianPacificRaceOriginOther varchar(30),
	ofWhiteRace int,
	doesNotWishToProvideRace int
)
go

/* getNext1071Id - stored procedure */
/* generates unique string-based ids (unique guid + loanNumber) */ 
if (object_id('dbo.getNext1071Id') IS NOT NULL)
  drop procedure getNext1071Id
go
create procedure getNext1071Id 
   @loanNumber int,  
   @customerIdentifier VARCHAR(48) output
as  
begin  
	set @customerIdentifier = convert(varchar(36), NEWID() )
	set @customerIdentifier += '-'
	set @customerIdentifier += convert(varchar(64), @loanNumber)
	select @customerIdentifier
	insert into Registered1071Ids (registrationDate, cust1071Idenitifier) values (GETDATE(),@customerIdentifier);	
end
go

/* test the stored proc  */
DECLARE @customerIdentifier varchar(100);
EXEC [dbo].getNext1071Id @loanNumber = '777', @customerIdentifier = @customerIdentifier OUTPUT;

