/* service config file */
import sql from 'mssql/msnodesqlv8.js'
const port = 9090;
const AGF1071APIKEY = "AGFIRST-123ABC"
const conn = new sql.ConnectionPool({
    connectionString: 'Driver={ODBC Driver 18 for SQL Server};Server=localhost;Database=master;Trusted_Connection=yes;TrustServerCertificate=yes'
});

export { port, conn, AGF1071APIKEY}