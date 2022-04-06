const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const PORT = 1000;
const app = express();

// create json parser
const jsonParser = bodyParser.json();
app.use(jsonParser);

app.use("/", express.static(path.join(__dirname, "../client/public")));

app.get("/", (req, res) => {
  res.send(`listening on port ${PORT}`);
});

app.post("/test", async (req, res) => {
  console.log(req.body, "request body");
  const test = await prisma.Test.create({ data: req.body });
  res.json(test);
});

app.get("/test", async (req, res) => {
  const test = await prisma.Test.findMany();
  res.json(test);
});

app.listen(PORT, () => console.log(`listening on port ${PORT}`));
