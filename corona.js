const axios = require("axios");

const cheerio = require("cheerio");
const log = console.log;
var mysql=require('mysql');
const request = require('request');
var fs = require('fs');
var option={
  host:'localhost',
  port:3306,
  user:'root',
  password:'rootpw',
  database:'sw_201544089',
  charset:'utf8'
}
var con=mysql.createConnection({
  host:'localhost',
  user:'root',
  password:'rootpw',
  database:'sw_201544089',
  charset:'utf8'
})

let url = 'https://www.suwon.go.kr/web/safesuwon/corona/PD_index.do';
axios.get(url).then(html => {
    let ulList = [];
    const $ = cheerio.load(html.data);
    const $bodyList = $("tbody")
    let re1 = [];
    let re2 = [];
    let re3 = [];
    let re4;
    $('ul').each(function(post){
      
      console.log($(this).text().trim())
    })
    
    
})