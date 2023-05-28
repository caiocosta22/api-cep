import sql from 'mssql';

const sqlConfig = {
  user: 'sa',
  password: '123456',
  database: 'CEP_API',
  server: 'DESKTOP-H16KU3U\\SQLEXPRESS',
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000
  },
  options: {
    encrypt: true, // for azure
    trustServerCertificate: true // change to true for local dev  / self-signed certs
  }
};

await sql.connect(sqlConfig),function(err){
    if (err){
        console.log("Deu erro")
    }
    else{
        console.log("Deu certo")
    }
};
    
