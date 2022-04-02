const Discord = require('discord.js');
var cheerio = require('cheerio');
const {fetch} = require('undici');

//run이라는 메소드(function)을 export(수출)
exports.run = async(client, msg, args) => {
		if(msg.content.split(" ")[0]=="!히스토리")
		{
			var nick=msg.content.split("!히스토리 ")[1];
			var url = "https://maple.gg/u/"+encodeURIComponent(nick);
			try{
				var l=await(await fetch(url)).text();
				var textt="";
				var $ = cheerio.load(l);
				var s=$("script").eq(23).toString();
				var a=s.split("var expHistoryLabels = ")[1].split("c3.generate")[0];
				var b=s.split("columns: ")[1].split("\"exp\"")[0];
				b=b+"]]";

				var res="";
				for(var i=0;i<7;i++) res=res+"\n"+JSON.parse(b)[0][i+1]+" : Lv."+JSON.parse(a)[i]["level"]+"("+JSON.parse(a)[i]["exp"]+"%)";
				
				const embed1 = new Discord.MessageEmbed()
					.setTitle("["+nick+"]님의 경험치 히스토리")
					.setDescription(res);
				msg.channel.send({ embeds: [embed1] });
			}catch(e)
			{
				msg.channel.send("["+nick+"]\n없는 캐릭터명 입니다."+e);
			}
		}
    };

exports.name='히스토리';
