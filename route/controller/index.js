const express = require('express');
const router = express.Router();
var result = [];
var fs = require('fs');
const cheerio = require('cheerio');
const request = require('request');

router.get("/crawlingTest", function(req, res, next){
  let url = "http://api.corona-19.kr/korea/?serviceKey=2bb0a05b45a0d1801f04e6a53adbc4e89";

  request(url, function(error, response, body){
    let resultArr = [];
    let re = [];
    const $ = cheerio.load(body);
    let colArr = $(".tit3")
    for(let i = 0; i < colArr.length; i++){
      resultArr.push(colArr[i].children[1].attribs.title)
    }
    fs.writeFile('file1.txt', re, 'utf8', function(error){
     
      console.log('성공');
    })
    res.json(resultArr)
  });
})



module.exports = router;