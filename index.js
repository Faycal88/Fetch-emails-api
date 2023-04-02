const express = require("express");
const app = express();
const cors = require("cors");
const { urlencoded } = require("express");
const bodyParser = require("body-parser");
var cron = require("node-cron");
require("dotenv").config();

app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);

async function GetEmails() {
  const inboxContent = await gmailApi.readInboxContent("");
  if (inboxContent === "No update") {
    return;
  }
  const obj = JSON.parse(inboxContent);
  console.log(obj.name);
}

const GmailAPI = require("./fetchGmail");
const gmailApi = new GmailAPI();

app.use(bodyParser.json({ limit: "10mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));
var jsonparser = bodyParser.json();
app.use(urlencoded({ extended: true }));
app.use(jsonparser);

cron.schedule("*/10 * * * * *", () => {
  GetEmails();
});

app.get("/", (req, res) => {
  res.redirect("https://wezign.com/index.html");
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
