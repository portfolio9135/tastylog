//パス操作のための path モジュールを読み込む。
const path = require("path");

//SQLファイルをロードするための mysql-fileloader を設定。
const { sql } = require("@garafu/mysql-fileloader")({ root: path.join(__dirname, "./sql") });

const pool = require("./pool");

const MySQLClient = {
  executeQuery: async function(query, values) {
    var results = await pool.executeQuery(query, values);
    return results;
  }
}

//【モジュールのエクスポート】
//MySQLClient と sql を他のファイルで使用できるようにエクスポート。
module.exports = {
  MySQLClient,
  sql
}