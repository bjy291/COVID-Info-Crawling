var mysql=require('mysql');
var session=require('express-session');
var mss=require('express-mysql-session')(session);
var option={
        host:'localhost',
        port:3306,
        user:'root',
        password:'rootpw',
        database:'sw_201544089',
        charset:'utf8'
}
var sstore=new mss(option);
var con=mysql.createConnection({
        host:'localhost',
        user:'root',
        password:'rootpw',
        database:'sw_201544089',
        charset:'utf8'
})
con.connect();
const convert = require('xml-js');
const request = require('request');
var fs = require('fs');
var xml2js = require('xml2js');
var parser = new xml2js.Parser();
const HOST = 'http://apis.data.go.kr/1741000/DisasterMsg2'
const SERVICE_KEY = '77nZRcdMR7%2FfePya%2BHDlBT5z4pOnJALSwIuqrHVqGXDgmdVlQvFeJpDdwA7pYxhrkgJPmOvfDHoRjIxTDrBCyA%3D%3D'
var requestUrl = `${HOST}/getDisasterMsgList?ServiceKey=${SERVICE_KEY}`
request.get(requestUrl, (err, res, body)=> {
   if(err) {
         console.log(`err => ${err}`)
   }
  else {
      if(res.statusCode == 200) {
                var result = body
                //console.log(`body data => ${result}`)
                var xmlToJson = convert.xml2json(result, {compact: true, spaces: 2});
                const config  = JSON.parse(xmlToJson);   
                
                sql = 'insert into message(date, location, text) values(?,?,?)';
                sql1 = 'delete from message'
                con.query(sql1, function(err){
                  if(err) console.log(err)
                  else{
                    console.log('삭제완료')
                  }
                })
                for(i=0;i<config.DisasterMsg.row.length;i++){
                  con.query(sql, [config.DisasterMsg.row[i].create_date._text, config.DisasterMsg.row[i].location_name._text,config.DisasterMsg.row[i].msg._text])
                }
                
       }
   }
})




//var url = 'http://apis.data.go.kr/1741000/DisasterMsg2/getDisasterMsgList?ServiceKey=77nZRcdMR7%2FfePya%2BHDlBT5z4pOnJALSwIuqrHVqGXDgmdVlQvFeJpDdwA7pYxhrkgJPmOvfDHoRjIxTDrBCyA%3D%3D'

