var express=require('express');
var request = require('request'),
    cheerio = require('cheerio');
const axios = require("axios");
var bodyParser=require('body-parser')
var app=express();
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


var requestUrl = 'http://api.corona-19.kr/korea/?serviceKey=2bb0a05b45a0d1801f04e6a53adbc4e89'
        request.get(requestUrl, (err,res,body) =>{
                if(err){
                        console.log(`err => ${err}`)
                }
                else {
                        if(res.statusCode == 200){
                                result = body
                                re = JSON.parse(result);
                                console.log(`body data => ${result}`)
                                var sql='insert into data(cased, recovered, death, nowcase, city1n, city2n, city3n, city4n, city5n, city1p, city2p, city3p, city4p, city5p, updatetime) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)';
                                var sql100 = 'insert into percent(recoveredPercentage, deathPercentage,checkingCounter,checkingPercentage,caseCount,casePercentage,notcaseCount,notcasePercentage,TotalChecking,TodayRecovered,TodayDeath,TotalCaseBefore) values(?,?,?,?,?,?,?,?,?,?,?,?)';
                                var sql2 = 'select count(*) as result from data';
                                var sql3 = 'delete from data';
                                var count = 0;
                                con.query(sql2,function(err,result){
                                        if(err) console.log(err)
                                        count = result;
                                })
                                if(count < 50){
                                        con.query(sql,[re.TotalCase, re.TotalRecovered, re.TotalDeath, re.NowCase, re.city1n, re.city2n, re.city3n, re.city4n, re.city5n,re.city1p ,re.city2p, re.city3p, re.city4p, re.city5p ,re.updateTime],function(err,result){
                                                if(err) console.log(err);
                                                else{
                                                        var ok=result.affectedRows;
                                                        if(ok==1){
                                                                console.log("디비 첫번째성공");
                                                                con.query(sql100,[re.recoveredPercentage, re.deathPercentage, re.checkingCounter, re.checkingPercentage, re.caseCount, re.casePercentage, re.notcaseCount, re.notcasePercentage, re.TotalChecking, re.TodayRecovered, re.TodayDeath, re.TotalCaseBefore],function(err,result2){
                                                                        if(err) console.log(err);
                                                                        else{
                                                                                var ok=result2.affectedRows;
                                                                                if(ok==1){
                                                                                        console.log("디비 인설트 성공");
                                                                                }else{
                                                                                        console.log("디비 인설트 실패");
                                                                                }
                                                                        }
                                                                })
                                                        }else{
                                                                console.log("디비 인설트 실패");
                                                        }
                                                }       
                                        })
                                }else{
                                        con.query(sql3, function(err){
                                                if(err) console.log(err);
                                        })
                                        con.query(sql,[re.TotalCase, re.TotalRecovered, re.TotalDeath, re.NowCase, re.city1n, re.city2n, re.city3n, re.city4n, re.city5n,re.city1p ,re.city2p, re.city3p, re.city4p, re.city5p ,re.updateTime],function(err,result){
                                                if(err) console.log(err);
                                                else{
                                                        var ok=result.affectedRows;
                                                        if(ok==1){
                                                                console.log("디비 첫번째성공");
                                                                con.query(sql100,[re.recoveredPercentage, re.deathPercentage, re.checkingCounter, re.checkingPercentage, re.caseCount, re.casePercentage, re.notcaseCount, re.notcasePercentage, re.TotalChecking, re.TodayRecovered, re.TodayDeath, re.TotalCaseBefore],function(err,result2){
                                                                        if(err) console.log(err);
                                                                        else{
                                                                                var ok=result2.affectedRows;
                                                                                if(ok==1){
                                                                                        console.log("디비 인설트 성공");
                                                                                }else{
                                                                                        console.log("디비 인설트 실패");
                                                                                }
                                                                        }
                                                                })
                                                        }else{
                                                                console.log("디비 인설트 실패");
                                                        }
                                                }       
                                        })
                                }
                        }
                }
        })
var requestUrl = 'http://api.corona-19.kr/korea/country/new/?serviceKey=2bb0a05b45a0d1801f04e6a53adbc4e89'
        request.get(requestUrl, (err,res,body) =>{
                if(err){
                        console.log(`err => ${err}`)
                }
                else {
                        if(res.statusCode == 200){
                                result = body
                                re = JSON.parse(result);
                                console.log(`body data => ${re}`)
                                var sql='insert into city(citynum,city,newcase,totalCase,recovered,death,percentage,newfcase,newccase) values(?,?,?,?,?,?,?,?,?)';
                                var sql1='delete from city'
                                con.query(sql1,function(err,result){
                                        if(err) console.log(err);
                                        else{
                                                var ok=result;
                                                console.log(ok);
                                        }
                                })
                                con.query(sql,[1,re.korea.countryName, re.korea.newCase, re.korea.totalCase, re.korea.recovered, re.korea.death,re.korea.percentage,re.korea.newFcase,re.korea.newCcase],function(err,result){})
                                con.query(sql,[2,re.seoul.countryName, re.seoul.newCase,re.seoul.totalCase,re.seoul.recovered,re.seoul.death,re.seoul.percentage,re.seoul.newFcase,re.seoul.newCcase])
                                con.query(sql,[3,re.busan.countryName, re.busan.newCase,re.busan.totalCase,re.busan.recovered,re.busan.death,re.busan.percentage,re.busan.newFcase,re.busan.newCcase])
                                con.query(sql,[4,re.daegu.countryName, re.daegu.newCase,re.daegu.totalCase,re.daegu.recovered,re.daegu.death,re.daegu.percentage,re.daegu.newFcase,re.daegu.newCcase])
                                con.query(sql,[5,re.incheon.countryName, re.incheon.newCase,re.incheon.totalCase,re.incheon.recovered,re.incheon.death,re.incheon.percentage,re.incheon.newFcase,re.incheon.newCcase])
                                con.query(sql,[6,re.gwangju.countryName, re.gwangju.newCase,re.gwangju.totalCase,re.gwangju.recovered,re.gwangju.death,re.gwangju.percentage,re.gwangju.newFcase,re.gwangju.newCcase])
                                con.query(sql,[7,re.daejeon.countryName, re.daejeon.newCase,re.daejeon.totalCase,re.daejeon.recovered,re.daejeon.death,re.daejeon.percentage,re.daejeon.newFcase,re.daejeon.newCcase])
                                con.query(sql,[8,re.ulsan.countryName, re.ulsan.newCase,re.ulsan.totalCase,re.ulsan.recovered,re.ulsan.death,re.ulsan.percentage,re.ulsan.newFcase,re.ulsan.newCcase])
                                con.query(sql,[9,re.sejong.countryName, re.sejong.newCase,re.sejong.totalCase,re.sejongrecovered,re.sejong.death,re.sejong.percentage,re.sejong.newFcase,re.sejong.newCcase])
                                con.query(sql,[10,re.gyeonggi.countryName, re.gyeonggi.newCase,re.gyeonggi.totalCase,re.gyeonggi.recovered,re.gyeonggi.death,re.gyeonggi.percentage,re.gyeonggi.newFcase,re.gyeonggi.newCcase])
                                con.query(sql,[11,re.gangwon.countryName, re.gangwon.newCase,re.gangwon.totalCase,re.gangwon.recovered,re.gangwon.death,re.gangwon.percentage,re.gangwon.newFcase,re.gangwon.newCcase])
                                con.query(sql,[12,re.chungbuk.countryName, re.chungbuk.newCase,re.chungbuk.totalCase,re.chungbuk.recovered,re.chungbuk.death,re.chungbuk.percentage,re.chungbuk.newFcase,re.chungbuk.newCcase])
                                con.query(sql,[13,re.chungnam.countryName, re.chungnam.newCase,re.chungnam.totalCase,re.chungnam.recovered,re.chungnam.death,re.chungnam.percentage,re.chungnam.newFcase,re.chungnam.newCcase])
                                con.query(sql,[14,re.jeonbuk.countryName, re.jeonbuk.newCase,re.jeonbuk.totalCase,re.jeonbuk.recovered,re.jeonbuk.death,re.jeonbuk.percentage,re.jeonbuk.newFcase,re.jeonbuk.newCcase])
                                con.query(sql,[15,re.jeonnam.countryName, re.jeonnam.newCase,re.jeonnam.totalCase,re.jeonnam.recovered,re.jeonnam.death,re.jeonnam.percentage,re.jeonnam.newFcase,re.jeonnam.newCcase])
                                con.query(sql,[16,re.gyeongbuk.countryName, re.gyeongbuk.newCase,re.gyeongbuk.totalCase,re.gyeongbuk.recovered,re.gyeongbuk.death,re.gyeongbuk.percentage,re.gyeongbuk.newFcase,re.gyeongbuk.newCcase])
                                con.query(sql,[17,re.gyeongnam.countryName, re.gyeongnam.newCase,re.gyeongnam.totalCase,re.gyeongnam.recovered,re.gyeongnam.death,re.gyeongnam.percentage,re.gyeongnam.newFcase,re.gyeongnam.newCcase])
                                con.query(sql,[18,re.jeju.countryName, re.jeju.newCase,re.jeju.totalCase,re.jeju.recovered,re.jeju.death,re.jeju.percentage,re.jeju.newFcase,re.jeju.newCcase])
                                con.query(sql,[19,re.quarantine.countryName, re.quarantine.newCase,re.quarantine.totalCase,re.quarantine.recovered,re.quarantine.death,re.quarantine.percentage,re.quarantine.newFcase,re.quarantine.newCcase])
                        }
                        else{  
                        }
                }
                
        })
var url = "https://www.incheon.go.kr/corona19/IC010001";
        
        request(url, (err, res, body) => {
                sql2 = 'delete from in_state';
                con.query(sql2, function(err){
                        if (err) console.log(err)
                        else{

                        }
                })
                if (err) throw err;
            
                let resultArr = {};
                let realTime = {};
                const $ = cheerio.load(body);
                let number = "";
                let rank = "";
                let keyword = "";
                let text = "";
                
            
                let colArr = $(".patient-profile-route-group").children("div.patient-profile-wrap");
                for (let i = 0; i < colArr.length; i++) {
                    number = colArr[i].children[1].children[0].data.replace('\t\t\t\t\t\t\t\t\t','').replace('\n','').replace('\n\t\t\t\t\t\t\t\t\t','').replace('\n\t\t\t\t\t\t\t\t\t','').replace('.','').replace(' ','')
                    rank = colArr[i].children[1].children[1].children[0].data
                    keyword = colArr[i].children[1].children[3].children[0].data
                    text = colArr[i].children[1].children[4].data.replace('\t\t\t\t\t\t\t\t\t','').replace('\n','').replace('\n\t\t\t\t\t\t\t\t\t','').replace('\n\t\t\t\t\t\t\t\t\t','')
                    realTime = {
                        number,
                        rank,
                        keyword,
                        text
                    };
                    
                    sql = 'insert into in_state(num, number, locate, text) values(?,?,?,?)';
                    
                    con.query(sql, [realTime.number, realTime.rank, realTime.keyword, realTime.text], function(err, result){
                        if(err) console.log(err)
                        else{
                               
                        }
                    })    
              
            
                }
                console.log(realTime)
        })
        const getHtml = async () => {
                try {
                  return await axios.get("https://www.incheon.go.kr/corona19/IC010001");
                } catch (error) {
                  console.error(error);
                }
        };
        let result = {};      
        getHtml()
                .then(html => {
                  let ulList = [];
                  const $ = cheerio.load(html.data);
                  const $bodyList = $("div.state-popup-wrap").children("div.state-popup-inner")
                 
                  let title = "";
                  var rea = "";
                  let re1 = "";
                  let re3 = "";
                  let re4 = "";
                  let re2 = "";
                  var a = 0;
                  
                  $bodyList.each(function(i, elem) {
                    rea = rea + $(this).find('em.num-red');
                    
                    ulList[a] = {
                        title: $(this).find('div.time').text().trim(),
                        re:$(this).find('em.num-red').text()[0,2],
                        re2:$(this).find('em.num-blue').text()
                    }
                    title =  ulList[0].title
                    re1 = rea.substr(20,3)
                    re2 = rea.substr(48,2)
                    re3 = rea.substr(75,2)
                    re4 = ulList[0].re2;
                    console.log(title)
                    result = {
                      title,
                      re1,
                      re2,
                      re3,
                      re4
                    };
                  });
                  sql1 = 'insert into in_state1(total,recover,recovered,touch,date) values(?,?,?,?,?)';  
                  
                  con.query(sql1,[result.re1, result.re2, result.re3, result.re4, result.title],function(err, result){
                        if(err) console.log(err)
                        else{
                                console.log("인천 인설트 성공")
                        }
                        })
             
                  return data;
                  
                })
        let url1 = 'https://www.worldometers.info/coronavirus/';
        axios.get(url1).then(html => {
                    let ulList = [];
                    const $ = cheerio.load(html.data);
                    const $bodyList = $("div.container")
                    let re1 = [];
                    let re2 = [];
                    let re3 = [];
                    let re4 =[];
                    $('div.number-table-main').each(function(post){
                      
                      re2.push($(this).text())
                    })
                    $('div.maincounter-number span').each(function(post){
                      
                      re1.push($(this).text())
                      
                    })
                    $('div.panel_front strong').each(function(post){
                      
                      re3.push($(this).text().replace('\n',''))
                      
                    })
                    $('div.content-inner div').each(function(post){
                      
                      re4.push($(this).text().replace('\n',''))
                      
                    })
                    
                    sql = 'insert into world(cases,death,recovered, activecase, closecase, crit, deaths, date) values(?,?,?,?,?,?,?,?)'
                    con.query(sql,[re1[0],re1[1],re1[2],re2[0],re2[1],re3[1],re3[3],re4[1]])
        })         
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

        url = 'http://www.seoul.go.kr/coronaV/coronaStatus.do#status_page_top';
              axios.get(url).then(html => {
                  let ulList = [];
                  const $ = cheerio.load(html.data);
                  const $bodyList = $("div.container")
                  let re1 = [];
                  let re2 = [];
                  let re3 = [];
                  let re4;
                  $('div.cont-page-wrap table tr td').each(function(post){
                    
                    re3.push($(this).text().trim())
                  })
                  $('div.status-seoul p').each(function(post){
                    
                    re1.push($(this).text().trim())
                  })
                  sql2 = 'delete from se_state'
                                con.query(sql2,function(err){
                                  if(err) console.log(err)
                                  else{
                                    console.log('서울상황삭제완료')
                                  }
                              })
                  sql = 'insert into se_state(number,date,home,vaca,touch,hospital) values(?,?,?,?,?,?)'
                  for(var i=0;i<re3.length;i=i+6){
                      con.query(sql,[re3[i],re3[i+1],re3[i+2],re3[i+3],re3[i+4],re3[i+5]],function(err){
                          if (err) console.log(err)
                          else{
                                
                              }
                        })
                       }
                  sql = 'insert into seoul_state(newcase, totalcase, recovered, newrecovered, death, checked) values(?,?,?,?,?,?)'
                  con.query(sql,[re1[0], re1[2],re1[6],re1[4],re1[8],re1[13]],function(err){
                    if(err) console.log(err)
                    else{
                      console.log('서울 통계 인설트')
                    }
                  })
              })

        url = 'https://www.gg.go.kr/contents/contents.do?ciIdx=1150&menuId=2909';
              axios.get(url).then(html => {
                  let ulList = [];
                  const $ = cheerio.load(html.data);
                  const $bodyList = $("div.result")
                  let re1 = [];
                  let re2 = [];
                  let re3 = [];
                  let re4;
                  $('div.gg strong').each(function(post){
                    
                    re1.push($(this).text().trim())
                  })
                  sql = "insert into gunggi_state(newcase, recover, recovered, death, totalcase) values(?,?,?,?,?)"
                  con.query(sql,[re1[0],re1[1],re1[2],re1[3],re1[4]])
                  $('div.content_box strong').each(function(post){
                    
                    re2.push($(this).text().trim())
                  })
                  $('div.content_box small').each(function(post){
                    
                    re3.push($(this).text().trim())
                  })
        
                  sql2 = "insert into gu_state(total, newtotal, gapung, newgapung, goyang, newgoyang, gwacheon, newgwacheon, gwangmung, newgwangmung, gwangzu, newgwangzu, guri, newguri, gunpo, newgunpo, gimpo, newgimpo, namyang, newnamyang, dongdu, newdongdu, bucheon, newbucheon, sungnam, newsungnam, suwon, newsuwon, sihung, newsihung, ansan, newansan, ansung, newansung, anyang, newanyang, yangzu, newyanzu, yangpung, newyangpung, yuzu, newyuzu, yungcheon, newyungcheon, osan, newosan, yungin, newyungin, uwang, newuwang, ujungbu, newujungbu, echeon, newecheon, pazu, newpazu, pungtac, newpungtac, pocheon, newpocheon, hanam, newhanam, hwasung, newhwasung) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"
                  con.query(sql2,[re2[0],re3[1],re2[1],re3[2],re2[2],re3[3],re2[3],re3[4],re2[4],re3[5],re2[5],re3[6],re2[6],re3[7],re2[7],re3[8],re2[8],re3[9],re2[9],re3[10],re2[10],re3[11],re2[11],re3[12],re2[12],re3[13],re2[13],re3[14],re2[14],re3[15],re2[15],re3[16],re2[16],re3[17],re2[17],re3[18],re2[18],re3[19],re2[19],re3[20],re2[20],re3[21],re2[21],re3[22],re2[22],re3[23],re2[23],re3[24],re2[24],re3[25],re2[25],re3[26],re2[26],re3[27],re2[27],re3[28],re2[28],re3[29],re2[29],re3[30],re2[30],re3[31],re2[31],re3[32]])
                  console.log('경기정보 인설트 완료')
              })

        url = 'http://www.daegu.go.kr/dgcontent/index.do?menu_id=00936598&menu_link=/icms/bbs/selectBoardList.do&bbsId=BBS_02092';
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
                  console.log('대구 확진자 정보 삽입')
              })

        url = 'https://www.incheon.go.kr/corona19/IC010001';
              axios.get(url).then(html => {
                  let ulList = [];
                  const $ = cheerio.load(html.data);
                  const $bodyList = $("div.patient-route")
                  let re1 = [];
                  let re2 = [];
                  let re3 = [];
                  let re4;
                  $('li p').each(function(post){
                    
                    re1.push($(this).text().trim())
                  })
                  sql2 = 'delete from location_in'
                  con.query(sql2,function(err){
                    if(err) console.log(err)
                  })
                  for(var i=0;i<re1.length;i++){
                    if(re1[i] == ''){
                      continue;
                    }else{
                      sql = 'insert into location_in(text) values(?)'
                      con.query(sql,[re1[i]])
                    }
                  
                      
                      console.log('인천 방문 삽입')

                    
                  }
              })
url = 'http://www.daegu.go.kr/dgcontent/index.do?menu_id=00936598&menu_link=/icms/bbs/selectBoardList.do&bbsId=BBS_02092';
              axios.get(url).then(html => {
                  let ulList = [];
                  const $ = cheerio.load(html.data);
                  const $bodyList = $("tr.info_td")
                  let re1 = [];
                  let re2 = [];
                  let re3 = [];
                  let re4;
                  $('strong').each(function(post){
                    
                    re1.push($(this).text().trim())
                  })
                  for(i=0;i<re1.length;i++){
                    sql='insert into location_dea(text) values(?)'
                    con.query(sql,[re1[i]])
                  }
                  console.log('대구 동선 삽입')
                  
              })