const fs = require("fs");
const http = require("http");
const url = require("url");

const data = fs.readFileSync(
  `${__dirname}/dev-data/data/tours-simple.json`,
  "utf-8"
);

// serverni yaratish

const server = http.createServer((req, res) => {
  const urlcha = req.url;
  if (urlcha === "/api") {
    res.end(data);
  } else {
    res.writeHead(404, {
      "Content-Type": "text/html",
      "my-nma-gap": "fail",
    });
    res.end("<h1>malumot topilmadi</h1>");
  }
});

// server ishlashi

server.listen(8000, "127.0.0.1", () => {
  console.log("server works excellent");
});
