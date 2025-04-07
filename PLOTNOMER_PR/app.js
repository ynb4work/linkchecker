const express = require("express");
const config = require("config");
const cors = require("cors");
const http = require("http");

const app = express();
const server = http.createServer(app);

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

async function start() {
  try {
    server.listen(PORT, () => console.log("Сервер запущен на порту", PORT));
  } catch (e) {
    console.log("Ошибка сервера:", e.message);
    process.exit(1);
  }
}

start();
