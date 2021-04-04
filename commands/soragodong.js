const Discord = require('discord.js');
const ments=["그래.","그.....래.","그럼~","아니.","안돼.","아.....니.","안.....돼.","언젠가는.","가만히 있어.","그것도 안돼.","다시 한 번 물어봐.","그렇고 말고.","그러지 마.","물론~","하지 마."];

//run이라는 메소드(function)을 export(수출)
exports.run = (client, msg, args) => {
	if(msg.content.indexOf("소라고동님")!=(-1))
{
   var r=Math.floor(Math.random()*100);
   if(r==1)
   msg.channel.send("고동이는 기여어>< 고동 고동");
   else if(r==2)
   msg.channel.send("그치만...."+msg.author.username+"쟝....이렇게라도 하지 않으면.....내겐 관심도 없는걸!");
   else
   {
   var t=Math.floor(Math.random()*(ments.length));
   msg.channel.send(ments[t]);
   }
   }
    };

exports.name='소라고동';