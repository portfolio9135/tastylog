//非同期処理を簡単にするための promisify 関数を読み込む。
const { promisify } = require("util");

//データベース接続の設定を読み込む。
const config = require("../../config/mysql.config.js");

//MySQLクライアントを読み込む。
const mysql = require("mysql");

//【データベース接続を設定】
const pool = mysql.createPool({
  host: config.HOST,
  port: config.PORT,
  user: config.USERNAME,
  password: config.PASSWORD,
  database: config.DATABASE,
  connectionLimit: config.CONNECTION_LIMIT,
  queueLimit: config.QUEUE_LIMIT
});

//【非同期クライアントの設定】
//con オブジェクトの connect、query、end メソッドを promisify して
//非同期関数に変換し、
module.exports = {
  pool,
  getConnection: promisify(pool.getConnection).bind(pool),
  executeQuery: promisify(pool.query).bind(pool),
  releaseConnection: function(connection) {
    connection.release();
  },
  end: promisify(pool.end).bind(pool)
};