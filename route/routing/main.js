var mysql=require('mysql');
var con=mysql.createConnection({
        host:'localhost',
        user:'root',
        password:'rootpw',
        database:'sw_201544089',
        charset:'utf8'
})
con.connect();
var http = require('http');
var fs = require('fs');
var url = require('url');
const convert = require('xml-js');
const request = require('request');
var requestUrl = 'http://api.corona-19.kr/korea/?serviceKey=2bb0a05b45a0d1801f04e6a53adbc4e89'
var urlencode = require('urlencode');

exports.main=function(req,res){
        var sql = "select * from message"
        con.query(sql,function(err,result){
                if(err) console.log(err)
                else{
                        res.render('main.jade',{me:result});
                }
        })
}

exports.state=function(req,res){ //메인페이지  
        var sql1 = "select * from data where iddata in (select max(iddata) from data)";
        var sql01 = "select * from percent where number in (select max(number) from percent)";
        var sql111 = "select * from city where citynum = 1";
        var sql2 = "select * from city where citynum = 2";
        var sql3 = "select * from city where citynum = 3";
        var sql4 = "select * from city where citynum = 4";
        var sql5 = "select * from city where citynum = 5";
        var sql6 = "select * from city where citynum = 6";
        var sql7 = "select * from city where citynum = 7";
        var sql8 = "select * from city where citynum = 8";
        var sql9 = "select * from city where citynum = 9";
        var sql10 = "select * from city where citynum = 10";
        var sql11 = "select * from city where citynum = 11";
        var sql12 = "select * from city where citynum = 12";
        var sql13 = "select * from city where citynum = 13";
        var sql14 = "select * from city where citynum = 14";
        var sql15 = "select * from city where citynum = 15";
        var sql16 = "select * from city where citynum = 16";
        var sql17 = "select * from city where citynum = 17";
        var sql18 = "select * from city where citynum = 18";
        var sql19 = "select * from city where citynum = 19";
        con.query(sql1,function(err, result){
                if(err) console.log(err)
                else{
                        con.query(sql2,function(err, result1){
                                if(err) console.log(err)
                                else{
                                        con.query(sql3,function(err, result2){
                                                if(err) console.log(err)
                                                else{
                                                        con.query(sql4,function(err,result3){
                                                                if(err) console.log(err)
                                                                else{       
                                                                        con.query(sql5,function(err,result4){
                                                                                if(err) console.log(err)
                                                                                else{
                                                                                        con.query(sql6,function(err,result5){
                                                                                                if(err) console.log(err)
                                                                                                else{
                                                                                                        con.query(sql7,function(err,result6){
                                                                                                                if(err) console.log(err)
                                                                                                                else{
                                                                                                                        con.query(sql8, function(err,result7){
                                                                                                                                if(err) console.log(err)
                                                                                                                                else{
                                                                                                                                        con.query(sql9, function(err,result8){
                                                                                                                                                if(err) console.log(err)
                                                                                                                                                else{
                                                                                                                                                        con.query(sql10,function(err, result9){
                                                                                                                                                                if(err) console.log(err)
                                                                                                                                                                else{
                                                                                                                                                                        con.query(sql11, function(err, result10){
                                                                                                                                                                                if(err) console.log(err)
                                                                                                                                                                                else{
                                                                                                                                                                                        con.query(sql12, function(err, result11){
                                                                                                                                                                                                if(err) console.log(err)
                                                                                                                                                                                                else{
                                                                                                                                                                                                        con.query(sql13, function(err, result12){
                                                                                                                                                                                                                if(err) console.log(err)
                                                                                                                                                                                                                else{
                                                                                                                                                                                                                        con.query(sql14, function(err, result13){
                                                                                                                                                                                                                                if(err) console.log(err)
                                                                                                                                                                                                                                else{
                                                                                                                                                                                                                                        con.query(sql15, function(err, result14){
                                                                                                                                                                                                                                                if(err) console.log(err)
                                                                                                                                                                                                                                                else{
                                                                                                                                                                                                                                                        con.query(sql16, function(err, result15){
                                                                                                                                                                                                                                                                if(err) console.log(err)
                                                                                                                                                                                                                                                                else{
                                                                                                                                                                                                                                                                        con.query(sql17, function(err, result16){
                                                                                                                                                                                                                                                                                if (err) console.log(err)
                                                                                                                                                                                                                                                                                else{
                                                                                                                                                                                                                                                                                        con.query(sql18, function(err, result17){
                                                                                                                                                                                                                                                                                                if(err) console.log(err)
                                                                                                                                                                                                                                                                                                else{
                                                                                                                                                                                                                                                                                                        con.query(sql19,function(err, result18){
                                                                                                                                                                                                                                                                                                               if(err) console.log(err)
                                                                                                                                                                                                                                                                                                               else{
                                                                                                                                                                                                                                                                                                                       con.query(sql01,function(err,result19){
                                                                                                                                                                                                                                                                                                                        
                                                                                                                                                                                                                                                                                                                        if(err) console.log(err)
                                                                                                                                                                                                                                                                                                                        else{
                                                                                                                                                                                                                                                                                                                                con.query(sql111, function(err,result20){
                                                                                                                                                                                                                                                                                                                                        res.render('state.jade',{data:result,city:result1,city2:result2,city3:result3,city4:result4,city5:result5,city6:result6,city7:result7,city8:result8,city9:result9,city10:result10,city11:result11,city12:result12,city13:result13, city14:result14, city15:result15, city16:result16, city17:result17, city18:result18, per:result19, state1:result20});
                                                                                                                                                                                                                                                                                                                                })
                                                                                                                                                                                                                                                                                                                        }
                                                                                                                                                                                                                                                                                                                       })
                                                                                                                                                                                                                                                                                                               }
                                                                                                                                                                                                                                                                                                        })
                                                                                                                                                                                                                                                                                                }
                                                                                                                                                                                                                                                        
                                                                                                                                                                                                                                                                                        })
                                                                                                                                                                                                                                                                                }
                                                                                                                                                                                                                                                                        })
                                                                                                                                                                                                                                                                }
                                                                                                                                                                                                                                                        })
                                                                                                                                                                                                                                                }
                                                                                                                                                                                                                                        })
                                                                                                                                                                                                                                }
                                                                                                                                                                                                                        })
                                                                                                                                                                                                                }
                                                                                                                                                                                                        })
                                                                                                                                                                                                }
                                                                                                                                                                                        })
                                                                                                                                                                                }
                                                                                                                                                                        })
                                                                                                                                                                }
                                                                                                                                                        })
                                                                                                                                                }
                                                                                                                                                
                                                                                                                                        })
                                                                                                                                }
                                                                                                                        })
                                                                                                                }
                                                                                                        })
                                                                                                }
                                                                                        })
                                                                                }
                                                                        })
                                                                }
                                                        })
                                                }
                                        })
                                }
                        }) 
                }
        })
        
};
exports.grap=function(req,res){
        var sql1 = "select * from percent where number in (select max(number) from percent)";
        var sql2 = "select * from data where iddata in (select max(iddata) from data)";
        var sql3 = "select * from data where iddata between (select max(iddata)-8 from data) and (select max(iddata) from data)";
        con.query(sql1,function(err, result){
                if(err) console.log(err);
                else{
                        con.query(sql2,function(err,result2){
                                if(err) console.log(err)
                                else{
                                        con.query(sql3,function(err,result3){
                                                if(err) console.log(err)
                                                else{
                                                        res.render('grap.jade',{per:result,data:result2, grap:result3});
                                                }
                                        })
                                }
                        })
                        
                }
        });
        
}
exports.in_state=function(req,res){
        var sql1 = "select * from city where citynum = 5";
        con.query(sql1, function(err, result){
                if(err) console.log(err);
                else{
                        sql = "select * from sw_201544089.in_state order by pk";
                        sql1 = "select * from sw_201544089.in_state1 where num = (select max(num) from sw_201544089.in_state1)"
                        con.query(sql, function(err, result2){
                                if(err) console.log(err)
                                else{
                                        con.query(sql1,function(err,result3){
                                                if(err) console.log(err)
                                                else{
                                                        res.render('in_state.jade',{city:result, inch:result2, st1:result3});
                                                }
                                        })
                                        
                                }
                        })
                        
                }
        })
}
exports.world=function(req,res){
        var sql = 'select * from sw_201544089.world where num = (select max(num) from sw_201544089.world)'
        var sql1 = 'select * from sw_201544089.world_state;';
        con.query(sql,function(err, result){
                if(err) console.log(err)
                else{
                        con.query(sql1,function(err, result2){
                                if(err) console.log(err)
                                else{
                                        res.render('world.jade',{data:result,world:result2})
                                }
                        })
                        
                }
        })
        
        
}
exports.mask=function(req,res){
        
        var sql = 'select * from mask';
        var sql1 = 'select search from mask where lat = (select max(lat) from mask)';
        var sql2 = 'select count(*) as cou from mask'
        con.query(sql,function(err, result){
                if (err) console.log(err)
                else{
                        con.query(sql1, function(err,result2){
                                if(err) console.log(err)
                                else{
                                        con.query(sql2, function(err,result3){
                                                if(err) console.log(err)
                                                else{
                                                        res.render('mask.jade', {mask:result,info:result2,count:result3});
                                                }
                                        })
                                        
                                }
                        })
                }
        })
        
}
exports.maskpost=function(req,res){
        var requestUrl = 'https://8oi9s0nnth.apigw.ntruss.com/corona19-masks/v1/storesByAddr/json?address='
        var id = urlencode(req.body.number)
        
        requestUrl = requestUrl + id;
        request.get(requestUrl, (err,res,body) =>{
                if(err){
                        console.log(`err => ${err}`)
                }
                else {
                        if(res.statusCode == 200){
                                result = body
                                re = JSON.parse(result);
                                console.log(`body data => ${re.stores[0].addr}`)
                                del = 'delete from sw_201544089.mask';
                                sql = 'insert into mask(code, addr, update_u, name_n, remain_stat, stock_at, lat, lng,search) values(?,?,?,?,?,?,?,?,?)';
                                con.query(del, function(err){
                                        if(err) console.log(err)
                                })
                                for(i=0;i<re.stores.length;i++){
                                       con.query(sql,[re.stores[i].code, re.stores[i].addr, re.stores[i].created_at, re.stores[i].name, re.stores[i].remain_stat, re.stores[i].stock_at, re.stores[i].lat, re.stores[i].lng,req.body.number],function(err){
                                               if (err) console.log(err)
                                               else{
                                                        
                                               }
                                       })
                                }
                                
                        }else{
                                
                        }
                }
        })
        //res.redirect(href='mask.jade');
        res.send('<script>alert("마스크 공적 검색 완료");location.href="/mask"</script>');
 }
exports.seoul=function(req,res){
        var sql='select * from se_state order by numke';
        var sql2='select * from seoul_state where num =(select max(num) from seoul_state)'
        var sql3 = "select * from city where citynum = 2";
        con.query(sql, function(err,result){
                if (err) console.log(err)
                else{
                        con.query(sql2,function(err, result2){
                                if(err) console.log(err)
                                else{
                                        con.query(sql3, function(err, result3){
                                                if(err) console.log()
                                                else{
                                                        res.render('seoul.jade',{seoul:result, se_state:result2, city:result3})
                                                }
                                        })
                                       
                                }
                        })
                       
                }
        })
        
}
exports.deagu=function(req,res){
        var sql='select * from dea_state order by numke';
        var sql3 = "select * from city where citynum = 4";
        con.query(sql, function(err,result){
                if (err) console.log(err)
                else{
                        con.query(sql3,function(err, result2){
                                if(err) console.log(err)
                                else{
                                res.render('deagu.jade',{deagu:result, city:result2})
                                       
                                }
                        })
                       
                }
        })
        
}
exports.gunggi=function(req,res){
        var sql='select * from gu_state where num =(select max(num) from gu_state)';
        var sql2='select * from gunggi_state where num =(select max(num) from gunggi_state)'
        var sql3 = "select * from city where citynum = 10";
        con.query(sql, function(err,result){
                if (err) console.log(err)
                else{
                        con.query(sql2,function(err, result2){
                                if(err) console.log(err)
                                else{
                                        con.query(sql3, function(err, result3){
                                                if(err) console.log()
                                                else{
                                                        res.render('gunggi.jade',{gunggi:result, gu_state:result2, city:result3})
                                                }
                                        })
                                       
                                }
                        })
                       
                }
        })
        
}

exports.location=function(req,res){
        sql='select count as cnt from location where num = 1'
        sql2 = 'select text from location_info'
        con.query(sql, function(err,result){
                if(err) console.log(err)
                else{
                        con.query(sql2, function(err, result2){
                                if(err) console.log(err)
                                else{
                                        res.render('test.jade',{cnt:result, text:result2});
                                }  
                        })
                }
        })
}
exports.locationpost=function(req,res){
        var sido = req.body.checkdata
        var maindata = '%'+req.body.maindata+'%'
        var bulid = req.body.buli
        console.log(bulid)
        if(sido == '인천'){
                var sql = 'select count(*) as cnt from location_in where text like ?'
                var sql1 = 'select text from location_in where text like ?'
                if(bulid != ''){
                        bulid = '%'+bulid+'%'
                        con.query(sql,[bulid],function(err, result){
                                if(err) console.log(err)
                                else{
                                        
                                        con.query(sql1, [bulid], function(err,result2){
                                                if(err) console.log(err)
                                                else{
                                                        var cnt = result[0].cnt.toString();
                                                        
                                                        if(cnt == '0'){
                                                                sql4= 'delete from location_info'
                                                                con.query(sql4)
                                                                sql2 = 'update location set count=? where num = 1'
                                                                con.query(sql2,[cnt]);
                                                        }else{
                                                                
                                                                sql2 = 'update location set count=? where num = 1'
                                                                sql3 ='insert into location_info(text) values(?)'
                                                                sql4= 'delete from location_info'
                                                                con.query(sql4)
                                                                con.query(sql2,[cnt]);
                                                                var text = [];
                                                                for(var i=0;i<result2.length;i++){
                                                                        text = result2[i].text;
                                                                        con.query(sql3,[text]);
                                                                }
  
                                                                
                                                        }
                                                        res.send('<script>alert("인천==");location.href="/location"</script>');
                                                }
                                        })
                                        

                                }
                        })
                }else{
                        con.query(sql,[maindata],function(err, result){
                                if(err) console.log(err)
                                else{
                                        
                                        con.query(sql1, [maindata], function(err,result2){
                                                if(err) console.log(err)
                                                else{
                                                        var cnt = result[0].cnt.toString();
                                                        
                                                        if(cnt == '0'){
                                                                sql4= 'delete from location_info'
                                                                con.query(sql4)
                                                                sql2 = 'update location set count = ? where num = 1'
                                                                con.query(sql2,[cnt]);
                                                        }else{
                                                                var text = result2[0].text;
                                                                sql2 = 'update location set count = ? where num = 1'
                                                                sql3 ='insert into location_info(text) values(?)'
                                                                sql4= 'delete from location_info'
                                                                con.query(sql4)
                                                                con.query(sql2,[cnt]);
                                                                
                                                                for(var i=0;i<result2.length;i++){
                                                                        text = result2[i].text;
                                                                        con.query(sql3,[text]);
                                                                }
                                                                
                                                        }
                                                        res.send('<script>alert("인천else");location.href="/location"</script>');
                                                }
                                        })             
                                }
                        })
                }
        }
        if(sido == '대구'){
                var sql = 'select count(*) as cnt from location_dea where text like ?'
                var sql1 = 'select text from location_dea where text like ?'
                if(bulid != ''){
                        bulid = '%'+bulid+'%'
                        con.query(sql,[bulid],function(err, result){
                                if(err) console.log(err)
                                else{
                                        
                                        con.query(sql1, [bulid], function(err,result2){
                                                if(err) console.log(err)
                                                else{
                                                        var cnt = result[0].cnt.toString();
                                                        
                                                        if(cnt == '0'){
                                                                sql4= 'delete from location_info'
                                                                con.query(sql4)
                                                                sql2 = 'update location set count=? where num = 1'
                                                                con.query(sql2,[cnt]);
                                                        }else{
                                                                
                                                                sql2 = 'update location set count=? where num = 1'
                                                                sql3 ='insert into location_info(text) values(?)'
                                                                sql4= 'delete from location_info'
                                                                con.query(sql4)
                                                                con.query(sql2,[cnt]);
                                                                var text = [];
                                                                for(var i=0;i<result2.length;i++){
                                                                        text = result2[i].text;
                                                                        con.query(sql3,[text]);
                                                                }
  
                                                                
                                                        }
                                                        res.send('<script>alert("대구==");location.href="/location"</script>');
                                                }
                                        })
                                        

                                }
                        })
                }else{
                        con.query(sql,[maindata],function(err, result){
                                if(err) console.log(err)
                                else{
                                        
                                        con.query(sql1, [maindata], function(err,result2){
                                                if(err) console.log(err)
                                                else{
                                                        var cnt = result[0].cnt.toString();
                                                        
                                                        if(cnt == '0'){
                                                                sql4= 'delete from location_info'
                                                                con.query(sql4)
                                                                sql2 = 'update location set count = ? where num = 1'
                                                                con.query(sql2,[cnt]);
                                                        }else{
                                                                var text = result2[0].text;
                                                                sql2 = 'update location set count = ? where num = 1'
                                                                sql3 ='insert into location_info(text) values(?)'
                                                                sql4= 'delete from location_info'
                                                                con.query(sql4)
                                                                con.query(sql2,[cnt]);
                                                                
                                                                for(var i=0;i<result2.length;i++){
                                                                        text = result2[i].text;
                                                                        con.query(sql3,[text]);
                                                                }
                                                                
                                                        }
                                                        res.send('<script>alert("대구else");location.href="/location"</script>');
                                                }
                                        })             
                                }
                        })
                }
        }
        if(sido == '서울'){
                var sql = 'select count(*) as cnt from location_seoul where text like ?'
                var sql1 = 'select * from location_seoul where text like ?'
                if(bulid != ''){
                        bulid = '%'+bulid+'%'
                        con.query(sql,[bulid],function(err, result){
                                if(err) console.log(err)
                                else{
                                        
                                        con.query(sql1, [bulid], function(err,result2){
                                                if(err) console.log(err)
                                                else{
                                                        var cnt = result[0].cnt.toString();
                                                        
                                                        if(cnt == '0'){
                                                                sql4= 'delete from location_info'
                                                                con.query(sql4)
                                                                sql2 = 'update location set count=? where num = 1'
                                                                con.query(sql2,[cnt]);
                                                        }else{
                                                                
                                                                sql2 = 'update location set count=? where num = 1'
                                                                sql3 ='insert into location_info(text) values(?)'
                                                                sql4= 'delete from location_info'
                                                                con.query(sql4)
                                                                con.query(sql2,[cnt]);
                                                                var text = [];
                                                                for(var i=0;i<result2.length;i++){
                                                                        text = result2[i].text;
                                                                        con.query(sql3,[text]);
                                                                }
  
                                                                
                                                        }
                                                        res.send('<script>alert("서울==");location.href="/location"</script>');
                                                }
                                        })
                                        

                                }
                        })
                }else{
                        con.query(sql,[maindata],function(err, result){
                                if(err) console.log(err)
                                else{
                                        
                                        con.query(sql1, [maindata], function(err,result2){
                                                if(err) console.log(err)
                                                else{
                                                        var cnt = result[0].cnt.toString();
                                                        
                                                        if(cnt == '0'){
                                                                sql4= 'delete from location_info'
                                                                con.query(sql4)
                                                                sql2 = 'update location set count = ? where num = 1'
                                                                con.query(sql2,[cnt]);
                                                        }else{
                                                                var text = result2[0].text;
                                                                sql2 = 'update location set count = ? where num = 1'
                                                                sql3 ='insert into location_info(text) values(?)'
                                                                sql4= 'delete from location_info'
                                                                con.query(sql4)
                                                                con.query(sql2,[cnt]);
                                                                
                                                                for(var i=0;i<result2.length;i++){
                                                                        text = result2[i].text;
                                                                        con.query(sql3,[text]);
                                                                }
                                                                
                                                        }
                                                        res.send('<script>alert("서울else");location.href="/location"</script>');
                                                }
                                        })             
                                }
                        })
                }
        }
}