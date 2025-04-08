const express = require("express");
const config = require("config");
const cors = require("cors");
const https = require("https");
const fs = require("fs");

const app = express();

app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(express.text());
app.use(express.raw({ type: '*/*' }));
app.use(cors());

app.all("*", (req, res) => {
  console.log("Новый запрос:");
  console.log("Метод:", req.method);
  console.log("URL:", req.originalUrl);
  console.log("Заголовки:", JSON.stringify(req.headers, null, 2));
  console.log("Тело запроса:", req.body);
  res.status(200).send("OK");
});

const PORT = config.get("port") || 5000;

// Замените пути к файлам сертификата
const options = {
  key: fs.readFileSync('privkey.pem'),
  cert: fs.readFileSync('fullchain.pem')
};

https.createServer(options, app).listen(PORT, () => {
  console.log(`HTTPS сервер запущен на порту ${PORT}`);
});
