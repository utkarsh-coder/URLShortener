var fs = require('fs')
var rawData = fs.readFileSync('urlDatabase.json')
var jsonURLs = JSON.parse(rawData)

const express = require('express')
const bodyParser = require("body-parser");
const shortid = require('shortid');
const app = express()
const port = 3000

const static = express.static("public");

const baseUrl = "http://localhost:3000/"

app.use(static);
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/:short', (req, res) => {
    const short = req.params.short;
    const orgUrl = jsonURLs[baseUrl + short];
    console.log("redirecting to "+orgUrl);
    res.redirect(orgUrl);
  })

app.post('/admin/urls/', (req, res) => {
    var shortened = baseUrl+shortid.generate();
    jsonURLs[shortened] = req.body.url;
    var jsonData = JSON.stringify(jsonURLs, null, 2);
    fs.writeFile('urlDatabase.json', jsonData, finished);
    var reply = {
        value: ""+shortened,
    }
    res.send(reply);
  })

  function finished (){
      console.log("shortend url generated and stored successfully");
  }

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})