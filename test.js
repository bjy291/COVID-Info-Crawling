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
const getHtml = async () => {
        try {
          return await axios.get("http://www.daegu.go.kr/dgcontent/index.do?menu_id=00936598&menu_link=/icms/bbs/selectBoardList.do&bbsId=BBS_02092");
        } catch (error) {
          console.error(error);
        }
      };
      let url = 'http://www.daegu.go.kr/dgcontent/index.do?menu_id=00936598&menu_link=/icms/bbs/selectBoardList.do&bbsId=BBS_02092';
      axios.get(url).then(html => {
          let ulList = [];
          const $ = cheerio.load(html.data);
          const $bodyList = $("table.bbsList")
          let re1 = [];
          let re2 = [];
          let re3 = [];
          let re4;
          $('tr.title_td td').each(function(post){
            
            re1.push($(this).text().trim())
          })
          sql='insert into dea_state(number, home, date, hospital) values(?,?,?,?)'
          for(i=0;i<re1.length;i=i+4){
            con.query(sql,[re1[i],re1[i+1],re1[i+2],re1[i+3]])
          }
          console.log('대구 확진자')
      })