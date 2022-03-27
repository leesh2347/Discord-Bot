const Discord = require('discord.js');
var cheerio = require('cheerio');
var request = require('request');

//run이라는 메소드(function)을 export(수출)
exports.run = (client, msg, args) => {
		if(msg.content.split(" ")[0]=="@무릉")
		{
			var nick=msg.content.split("@무릉 ")[1];
			var url = "https://maple.gg/u/"+encodeURIComponent(nick);
				request(url, function(error, response, html){
					if (error) {throw error};
					var textt="";
					var $ = cheerio.load(html);
					var a=$(".character-card-additional>li>b").eq(0).text();
					if(a=="예전무릉")
					{
						textt=textt+"기록이 없습니다.\n\n개편전 무릉 기록\n";
					}
					textt=textt+"층수: "+$(".character-card-additional>li>span").eq(0).text()+"\n시간: "+$(".character-card-additional>li>small").eq(1).text();
					const embed1 = new Discord.MessageEmbed()
						.setTitle("["+nick+"]")
						.setDescription(textt);
					msg.channel.send({ embeds: [embed1] });
				});
		}
		else if(msg.content.split(" ")[0]=="@유니온")
		{
			var nick=msg.content.split("@유니온 ")[1];
			var url = "https://maple.gg/u/"+encodeURIComponent(nick);

				request(url, function(error, response, html){
					if (error) {throw error};
					var textt="";
					var $ = cheerio.load(html);
					var a=$(".character-card-additional>li>span").eq(1).text();
					if(a!="기록없음")
					{
						var n=$("#app > div.card.border-bottom-0 > div > section > div.row.text-center > div:nth-child(3) > section > footer > div.d-block.mb-1 > span").text().split("전투력 ")[1];
						var num=Number(parseInt(n.replace(/,/g,"")));
						var coin=Math.ceil(num*864/1000000000);
						if($(".character-card-additional>li>small").eq(0).text()=="최고")
						textt=textt+$(".character-card-additional>li>span").eq(1).text()+"\n"+$(".character-card-additional>li>small").eq(2).text()+"\n전투력: "+n+"\n일일 코인 수급량: "+coin;
						else
						textt=textt+$(".character-card-additional>li>span").eq(1).text()+"\n"+$(".character-card-additional>li>small").eq(0).text()+"\n전투력: "+n+"\n일일 코인 수급량: "+coin;
						const embed1 = new Discord.MessageEmbed()
							.setTitle("["+nick+"]")
							.setDescription(textt);
						msg.channel.send({ embeds: [embed1] });
					}
					else
					{
						const embed1 = new Discord.MessageEmbed()
							.setTitle("["+nick+"]")
							.setDescription("기록이 없습니다.\n유니온은 본캐만 조회가 가능합니다. 본캐인지 확인해주세요!");
						msg.channel.send({ embeds: [embed1] });
					}
				});
		}
    };

exports.name='무릉유니온';
