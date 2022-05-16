const axios = require("axios");
const cheerio = require("cheerio");
const log = console.log;
const request = require('request');
var fs = require('fs');

const mcdonaldsURL =
  "https://www.mcdonalds.co.kr/www/kor/menu/menu_list.do?cate_cd=100";
const naverURL = "https://www.naver.com/";

const url = naverURL;
  request(url, (error, response, body) => {
    if (error) throw error;

    let resultArr = [];

    const $ = cheerio.load(body);

    let rank = "";
    let keyword = "";
    let realTime = {};

    let colArr = $(".ah_item");
    for (let i = 0; i < colArr.length; i++) {
      rank = colArr[i].children[1].children[1].children[0].data;
      keyword = colArr[i].children[1].children[3].children[0].data;
      realTime = {
        rank,
        keyword
      };
      console.log(colArr[i].children[1].children[1].children[0].data);
      console.log(colArr[i].children[1].children[3].children[0].data);
      resultArr.push(realTime);
    }

    return res.json({
      resultArr
    });
  });
