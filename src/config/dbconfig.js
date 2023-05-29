import sql from 'mssql';

const sqlConfig = {
  user: 'caio',
  password: '123456',
  database: 'CEP_API',
  server: 'localhost',
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000
  },
  options: {
    encrypt: false // for azure
  }
};
/*
await sql.connect(sqlConfig,(err)=>{
    if (err){
        console.log("Falha na conexão com o banco de dados")
    }
    else{
        console.log("Conexão com banco de dados sucedida!")
    }
});*/
    
export default sqlConfig