const Discord = require('discord.js');
const foods=["햄버거","피자","삼겹살","닭갈비","돈까스","초밥","회덮밥","짜장면","짬뽕","탕수육","재획","민트초코","장어구이","순대국밥","부대찌개","보쌈","갈비탕","꼬리곰탕","삼계탕","칼국수","쌀국수뚝배기","한솥","편의점도시락","봉구스밥버거","냉면","A+등급한우","볶음밥","오므라이스","떡만두국","순두부찌개","된장찌개","스파게티","함박스테이크","마라탕","탄탄면","규카츠","규동","치킨","닭볶음탕","라면","라볶이","전복죽","아케인리버 물방울석","코어 젬스톤","프로틴","캐비어","푸아그라","전주비빔밥","족발","명륜진사갈비"];
var sangchuHP = {};
var sangchuMob = {};
const fs = require('fs');
var dirn="/data/data/com.termux/files/home/discord-bot";

function read(target, res){
   return JSON.parse(fs.readFileSync(dirn+"/SangChu/Data/"+target+".json"))[res];
   }
function write(target, res){
   var result = JSON.stringify(res);
    var write = fs.writeFileSync(dirn +"/SangChu/Data/"+target+".json", result);
    return write;
   }
function data(target){
   return JSON.parse(fs.readFileSync(dirn +"/SangChu/Data/"+target+".json"));
   }
   
function user(target, res, to){
   var Data = data(target);
   Data[res] = to;
   var result = JSON.stringify(Data);
    var write = fs.writeFileSync(dirn +"/SangChu/Data/"+target+".json", result);
    return write;
   }

function levelup(client, msg, args)
{
   user(msg.author.username, "exp", read(msg.author.username, "exp") - read(msg.author.username, "level")*50);
   user(msg.author.username, "level", read(msg.author.username, "level") + 1);
   user(msg.author.username, "Size", read(msg.author.username, "Size") + 1);
   user(msg.author.username, "Coin", read(msg.author.username, "Coin") + 10);
   msg.channel.send("[레벨업] 빠바빱바빠~"+read(msg.author.username, "level")+"레벨로 올랐어요!");
   if(read(msg.author.username, "level")>20&&read(msg.author.username, "level")<51)
      user(msg.author.username, "sangchu", "시든 상추");
   else if(read(msg.author.username, "level")>50&&read(msg.author.username, "level")<81)
      user(msg.author.username, "sangchu", "일반 상추");   
   else if(read(msg.author.username, "level")>80&&read(msg.author.username, "level")<101)
      user(msg.author.username, "sangchu", "싱싱한 상추");   
   else if(read(msg.author.username, "level")>100&&read(msg.author.username, "level")<121)
      user(msg.author.username, "sangchu", "주니어 상추");   
   else if(read(msg.author.username, "level")>120&&read(msg.author.username, "level")<151)
      user(msg.author.username, "sangchu", "시니어 상추");   
   else if(read(msg.author.username, "level")>150&&read(msg.author.username, "level")<181)
      user(msg.author.username, "sangchu", "마스터 상추");   
   else if(read(msg.author.username, "level")>180&&read(msg.author.username, "level")<201)
      user(msg.author.username, "sangchu", "브론즈 상추");   
   else if(read(msg.author.username, "level")>200&&read(msg.author.username, "level")<301)
      user(msg.author.username, "sangchu", "실버 상추");
   else if(read(msg.author.username, "level")>300&&read(msg.author.username, "level")<401)
      user(msg.author.username, "sangchu", "골드 상추");   
   else if(read(msg.author.username, "level")>400&&read(msg.author.username, "level")<501)
      user(msg.author.username, "sangchu", "플래티넘 상추");
   else if(read(msg.author.username, "level")>500&&read(msg.author.username, "level")<1001)
      user(msg.author.username, "sangchu", "다이아몬드 상추");
   else if(read(msg.author.username, "level")>1000&&read(msg.author.username, "level")<10001)
      user(msg.author.username, "sangchu", "전설의 상추");   
   else if(read(msg.author.username, "level")>10000)
      user(msg.author.username, "sangchu", "신의 상추");   
}

//run이라는 메소드(function)을 export(수출)
exports.run = (client, msg, args) => {
      if (msg.content == "@상추게임"){
        msg.channel.send("SangChu!\n\n@회원가입\n@밥주기\n@내상추");
      }
      else if (msg.content == "@회원가입"){
        var a = {"Coin":100,"Size":0.5,"level":1,"exp":0,"Food":["규카츠"],"Hunger":100,"hp":1,"def":1,"atk":1,"sangchu":"썩은 상추"};
        write(msg.author.username, a);
        msg.channel.send("이에에에에에");
        msg.channel.send("운터운터운터운터운터 상추 게임!");
        msg.channel.send("회원가입 완료!");
      }
      else if (msg.content == "@내상추"){
         try{
          msg.channel.send("[ "+msg.author.username+"님의 상추 ]\n상추 경험치 : "+read(msg.author.username, "exp")+"EXP\nSangChu[LV]."+read(msg.author.username, "level")+"\n상추 코인 : "+read(msg.author.username, "Coin")+"S\n크기 : "+read(msg.author.username, "Size")+"\n밥 인벤토리 : "+read(msg.author.username, "Food").join(", ")+"\n\n상추 티어 : "+read(msg.author.username, "sangchu"));
         } catch(e)
         {
            msg.channel.send(msg.author.username+"님의 가입정보가 없습니다. 먼저 @회원가입 을 통해 회원가입을 해 주세요!");
         }
      }
      else if (msg.content == "@밥주기"){
         try{
            user(msg.author.username, "exp", read(msg.author.username, "exp") + read(msg.author.username, "level")*20);
            user(msg.author.username, "Coin", read(msg.author.username, "Coin") + 1);
            msg.channel.send("[밥주기]\n상추상추상추 맛있따.\n이에ㅔ에에\n+"+read(msg.author.username, "level")*20+"EXP");
         if((Math.random()*20)==1)
         {
            if(read(msg.author.username, "Food")!=foods){
               var arr=read(msg.author.username, "Food");
               var newfood="";
               do{
                  newfood=foods[Math.random()*(foods.length)];
                  
               }while(arr.indexOf(newfood)!=(-1));
               arr.push(newfood);
               user(msg.author.username, "Food", arr);
               user(msg.author.username, "Coin", read(msg.author.username, "Coin") + 100);
               msg.channel.send("새로운 밥 획득!\n현재 밥 인벤토리: "+read(msg.author.username, "Food").join(", "));
            }
         }
         if (read(msg.author.username, "exp") >= read(msg.author.username, "level")*50){
            levelup(client, msg, args);
         }
         }catch(e){
            msg.channel.send(msg.author.username+"님의 가입정보가 없습니다. 먼저 @회원가입 을 통해 회원가입을 해 주세요!");
         }
      }
    };

exports.name='상추게임';