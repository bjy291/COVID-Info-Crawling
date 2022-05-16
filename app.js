{//서버설정###################################서버설정#####################################서버설정
    var express=require('express');
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
    app.locals.pretty=true;
    app.set('view engine','jade');
    app.set('view engine','ejs');
    app.set('views','./views');
    
    app.use(express.static(__dirname+'/css'));
    app.use("/css", express.static(__dirname + '/css'));
    app.use("/img", express.static(__dirname + '/img'));
    app.use(express.static(__dirname+'/js'));
    app.use("/js", express.static(__dirname + '/js'));
    app.use(bodyParser.urlencoded({extended:false}));
    app.use(bodyParser.json());
    app.use(session({
            secret:'test',
            resave:false,
            saveUninitialized:true,
            store:sstore
    }));
    app.engine('html', require('ejs').renderFile);
    app.use('/', require('./route/controller/mainctr'));
    
    
    app.listen(3000,function(){
            console.log('Conneted 3000 port');
    });
}
{//함수###################################함수######################################함수
Date.prototype.format = function(f) {
    if (!this.valueOf()) return " ";
    var weekName = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
    var d = this;
    return f.replace(/(yyyy|yy|MM|dd|E|hh|mm|ss|a\/p)/gi, function($1) {
            switch ($1) {
                    case "yyyy": return d.getFullYear();
                    case "yy": return (d.getFullYear() % 1000).zf(2);
                    case "MM": return (d.getMonth() + 1).zf(2);
                    case "dd": return d.getDate().zf(2);
                    case "E": return weekName[d.getDay()];
                    case "HH": return d.getHours().zf(2);
                    case "hh": return ((h = d.getHours() % 12) ? h : 12).zf(2);
                    case "mm": return d.getMinutes().zf(2);
                    case "ss": return d.getSeconds().zf(2);
                    case "a/p": return d.getHours() < 12 ? "오전" : "오후";
                    default: return $1;
            }
    });
};
String.prototype.string = function(len){var s = '', i = 0; while (i++ < len) { s += this; } return s;};
String.prototype.zf = function(len){return "0".string(len - this.length) + this;};
Number.prototype.zf = function(len){return this.toString().zf(len);};
}

const convert = require('xml-js');
const request = require('request');


const cron = require('node-cron');
 
cron.schedule('0 0 0 * * *', () => {
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
                                                                console.log("디비 인설트 성공");
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
                                                                console.log("디비 인설트 성공");
                                                        }else{
                                                                console.log("디비 인설트 실패");
                                                        }
                                                }       
                                        })
                                }
                        }
                }
        })
});

cron.schedule('0 1 0 * * *', () => {
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
                                con.query(sql,[18,re.jeju.countryName, re.jeju.newCase,re.jeju.totalcase,re.jeju.recovered,re.jeju.death,re.jeju.percentage,re.jeju.newFcase,re.jeju.newCcase])
                                con.query(sql,[19,re.quarantine.countryName, re.quarantine.newCase,re.quarantine.totalCase,re.quarantine.recovered,re.quarantine.death,re.quarantine.percentage,re.quarantine.newFcase,re.quarantine.newCcase])
                        }
                        else{  
                        }
                }
                
        })
});

