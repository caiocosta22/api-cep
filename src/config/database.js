import mssql from 'mssql';
const database = mssql();
//banco de dados esta no drive ''CEP_API''
 async function connectToDatabase() {
  try {
    await sql.connect(database);
    console.log('Conexão com o banco de dados estabelecida com sucesso!');
    
    // Realize suas operações com o banco de dados aqui
    
    // Exemplo de consulta:
    // const result = await sql.query('SELECT * FROM Tabela');
    // console.log('Resultado da consulta:', result.recordset);

    // Encerre a conexão com o banco de dados quando terminar
    await sql.close();
    console.log('Conexão com o banco de dados encerrada com sucesso!');
  } catch (error) {
    console.error('Erro ao conectar ao banco de dados:', error);
  }
}

// Chame a função para conectar ao banco de dados
export default connectToDatabase;