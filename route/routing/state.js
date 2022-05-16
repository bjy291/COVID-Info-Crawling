var mysql=require('mysql');
var con=mysql.createConnection({
        host:'localhost',
        user:'root',
        password:'rootpw',
        database:'sw_201544089',
        charset:'utf8'
})
con.connect();
var fs = require('fs');
const convert = require('xml-js');
const request = require('request');
var result = [];
var requestUrl = 'http://api.corona-19.kr/korea/?serviceKey=2bb0a05b45a0d1801f04e6a53adbc4e89'

exports.display=function(req,res){ 
        
        console.log(req.body);
        request.get(requestUrl, (err,res,body) =>{
                if(err){
                        console.log(`err => ${err}`)
                }
                else {
                        if(res.statusCode == 200){
                                result = body
                                re = JSON.parse(result);
                                console.log(`body data => ${result}`)
                                var sql='insert into data(cased, recovered, death, nowcase) values(?,?,?,?)';
                                var sql2 = 'select count(*) as result from data';
                                var sql3 = 'delete from data';
                                var count = 0;
                                con.query(sql2,function(err,result){
                                        if(err) console.log(err)
                                        count = result;
                                })
                                if(count < 50){
                                        con.query(sql,[re.TotalCase, re.TotalRecovered, re.TotalDeath, re.NowCase],function(err,result){
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
                                        con.query(sql,[re.TotalCase, re.TotalRecovered, re.TotalDeath, re.NowCase],function(err,result){
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
        var sql4 = "select * from data where iddata in (select max(iddata) from data)";
        con.query(sql4,function(err, result){
                if(err) console.log(err)
                else{
                        console.log(result);
                        res.render('state',{data:result});
                }
        })
};


