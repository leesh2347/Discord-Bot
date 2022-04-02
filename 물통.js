const Discord = require('discord.js');
var cheerio = require('cheerio');
const {fetch} = require('undici');
const servers=["scania","bera","luna","jenis","croa","union","elysium","enosis","red","aurora","arcane","nova","average"];
const serverk=["스카니아","베라","루나","제니스","크로아","유니온","엘리시움","이노시스","레드","오로라","아케인","노바","평균"];

//run이라는 메소드(function)을 export(수출)
exports.run = async(client, msg, args) => {
		if(msg.content.split(" ")[0]=="!물통")
		{
			var serv=msg.content.split(" ")[1];
			if(serverk.indexOf(serv)==-1||serv=="평균")
			{
				var num=Number(parseInt(msg.content.split(" ")[2]));
				try{
					var a=await(await fetch("https://gamemarket.kr/api/price1.php")).text();
					var str="";
					for(var i=0;i<13;i++)
					{
					str=str+serverk[i]+" : "+JSON.parse(a)["direct"][servers[i]]+"\n";
					}
					
					const embed1 = new Discord.MessageEmbed()
						.setTitle("서버별 물통 시세 현황")
						.setDescription(str);
					msg.channel.send({ embeds: [embed1] });					
				}catch(e)
				{
					msg.channel.send("사이트 접속 오류");
				}
			}
			else{
				var num=Number(parseInt(msg.content.split(" ")[2]));
				try{
					var a=await(await fetch("https://gamemarket.kr/api/price1.php")).text();
					var res=JSON.parse(a)["direct"][servers[serverk.indexOf(serv)]];
					const embed1 = new Discord.MessageEmbed()
						.setTitle("현재 ["+serv+"] 서버의 물통 시세 : "+res)
						.setDescription("입력하신 "+num+"억의 시세는\n"+Number(res)*num+"원 입니다.");
					msg.channel.send({ embeds: [embed1] });	
				}
				catch(e)
				{
					msg.channel.send("사이트 접속 오류");
				}
			}

		}
    };

exports.name='물통';
