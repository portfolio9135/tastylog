const PORT = process.env.PORT;
const path = require("path");
const logger = require("./lib/log/logger.js");
const accesslogger = require("./lib/log/accesslogger.js");
const applicationlogger = require("./lib/log/applicationlogger.js");
const express = require("express");
const favicon = require("serve-favicon");
const app = express();

//【Expressの設定】
//テンプレートエンジンを ejs に設定。
app.set("view engine", "ejs");

//セキュリティのために x-powered-by ヘッダーを無効にする。
app.disable("x-powered-by");

//グローバルなメソッドをViewエンジンに渡す
app.use((req, res, next) => {
  res.locals.moment = require("moment");
  res.locals.padding = require("./lib/math/math.js").padding;
  next();
});

//【静的コンテンツの設定】
//サイトのファビコンを設定。
app.use(favicon(path.join(__dirname, "/public/favicon.ico")));

///public ディレクトリを静的コンテンツとして公開。
app.use("/public", express.static(path.join(__dirname, "/public")));

// 【アクセスログの設定】
//アクセスログを記録するミドルウェアを使用。
app.use(accesslogger());

// 【動的コンテンツの設定】【ルートの設定】
//検索ページのルーティング設定
app.use("/search", require("./routes/search.js"));

//詳細ページのルーティング設定
app.use("/shops", require("./routes/shops.js"));

//ルート / に対してルーティングを設定。
app.use("/", require("./routes/index.js"));

// 【アプリケーションログの設定】
//アプリケーションのログを記録するミドルウェアを使用。
app.use(applicationlogger());

//【サーバーを起動】
//サーバーを指定されたポートで起動し、起動メッセージをログに記録。
app.listen(PORT, ()=> {
  logger.application.info(`ポート番号は${PORT}ですよーーーーーーーーーー`);
})