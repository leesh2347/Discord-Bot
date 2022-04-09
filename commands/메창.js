const Discord = require('discord.js');
var cheerio = require('cheerio');
const {fetch} = require('undici');

const result=["메린이 응애 나 애기 메린","무자본 평균","경손실 따질 스펙","메이플 평균","메창","메이플 인생 메생이","컨텐츠가 부족한 토끼공듀","넥슨 VVIP 흑우 ㅋㅋ"];


async function calculatemurung(nickname){
   var url="https://maple.gg/u/"+nickname;
   var l=await(await fetch(url)).text();
   var $ = cheerio.load(l);
   
   var mur=Number($(".character-card-additional>li>span").eq(0).text().replace("층", ""));
   if(isNaN(mur))
	   mur=0;
   return mur;
}

async function calculateunion(nickname,murung){
   var url="https://maple.gg/u/"+nickname;
   var l=await(await fetch(url)).text();
   var $ = cheerio.load(l);
   var un=0;
   if(murung!=0)
	   un=Number($(".character-card-additional>li>small").eq(2).text().replace("Lv.", ""));
   else
	   un=Number($(".character-card-additional>li>small").eq(0).text().replace("Lv.", ""));
   return un;
}

async function calculatelevel(nickname,isrbt){
	var lv=0;
   if(isrbt==0){
	   var url="https://maplestory.nexon.com/Ranking/World/Total?c="+nickname;
	   var l=await(await fetch(url)).text();
	   var $ = cheerio.load(l);
	   lv=Number($("#container > div > div > div:nth-child(4) > div.rank_table_wrap > table > tbody > tr.search_com_chk > td:nth-child(3)").text().replace("Lv.", ""));
   }

   else
   {
	   var url="https://maplestory.nexon.com/Ranking/World/Total?c="+nickname+"&w=254";
	   var l=await(await fetch(url)).text();
	   var $ = cheerio.load(l);
	   lv=Number($("#container > div > div > div:nth-child(4) > div.rank_table_wrap > table > tbody > tr.search_com_chk > td:nth-child(3)").text().replace("Lv.", ""));
   }
   return lv;
}

async function isreboot(nickname){
	var url="https://maplestory.nexon.com/Ranking/World/Total?c="+nickname;
	var l=await(await fetch(url)).text();
	var $ = cheerio.load(l);
	var isrb=$("#container > div > div > div:nth-child(4)").text();
	if(isrb.includes("랭킹정보가 없습니다."))
		return "o";
	else
		return "x";
}

//run이라는 메소드(function)을 export(수출)
exports.run = async (client, msg, args) => {
		if(msg.content=="!메창"){
			const embed1 = new Discord.MessageEmbed()
				.setTitle("사용법: !메창 (닉네임)")
				.setDescription(["레벨-100+무릉x3+유니온/40",
					"※유니온 8000 이상: 가중치 25%",
					"※무릉 50 이상=무릉x4로 계산",
					"※레벨 250 이상시 10, 260 이상시 20, 275 이상시 40 가중치 부여",
					"",
					"200~300 : 메린이",
					"301~400 : 무자본 평균",
					"401~450 : 메른이",
					"451~550 : 메이플 평균",
					"551~650 : 메창",
					"651~700 : 메이플 인생.",
					"701~750 : 토끼공듀",
					"751+ : 넥슨 VVIP"].join("\n"));
			msg.channel.send({ embeds: [embed1]});
		}
		else if(msg.content.split(" ")[0]=="!메창")
		{
			var nick=msg.content.split("!메창 ")[1];
			var lev=0;
			var murung=0;
			var union=0;
			try{
				var isrebt=await isreboot(nick);
				if(isrebt=="x")
				{
					murung=await calculatemurung(nick);
					union=await calculateunion(nick,murung);
					lev=await calculatelevel(nick,0);
				}
				else
				{
					murung=await calculatemurung(nick);
					union=await calculateunion(nick,murung);
					lev=await calculatelevel(nick,1);
				}
				var judge=0;
				var res=0;
				if(murung>49) judge=judge+(murung*4);
				else judge=judge+(murung*3);
				if(union>7999) judge=judge+(union/32);
				else judge=judge+(union/40);
				if(Number(lev)>274)
					judge=Math.ceil(judge)+Number(lev)-60;
				else if(Number(lev)>259)
					judge=Math.ceil(judge)+Number(lev)-80;
				else if(Number(lev)>249)
					judge=Math.ceil(judge)+Number(lev)-90;
				else
					judge=Math.ceil(judge)+Number(lev)-100;
				if(judge<301) res=0;
				else if(judge<401) res=1;
				else if(judge<451) res=2;
				else if(judge<551) res=3;
				else if(judge<651) res=4;
				else if(judge<701) res=5;
				else if(judge<751) res=6;
				else res=7;
				if(isNaN(judge))
				{
					const embed1 = new Discord.MessageEmbed()
						.setTitle("["+nick+"] 님의 메창력")
						.setDescription("본캐여부를 확인해주세요!\n본캐(월드 내 가장 레벨이 높은 캐릭터)가 아니면 측정할 수 없습니다.");
					msg.channel.send({ embeds: [embed1] });
				}
				else
				{
					if(isrebt=="x"){
						var url="https://maplestory.nexon.com/Ranking/World/Total?c="+nick;
						var l=await(await fetch(url)).text();
						var $ = cheerio.load(l);
						var img = $("#container > div > div > div:nth-child(4) > div.rank_table_wrap > table > tbody > tr.search_com_chk > td.left > span").find("img").attr("src");
						var im=new Discord.MessageAttachment(img,"character.png");
						var serverimg=$("tr.search_com_chk>td>dl>dt").find("img").attr("src");
						var datar = $("tr.search_com_chk>td>dl>dd").eq(0).text();//공홈파싱
						var job = datar.split("/")[1].split("\">\"")[0];//직업
					}
					else
					{
						var url="https://maplestory.nexon.com/Ranking/World/Total?c="+nick+"&w=254";
						var l=await(await fetch(url)).text();
						var $ = cheerio.load(l);
						var img = $("#container > div > div > div:nth-child(4) > div.rank_table_wrap > table > tbody > tr.search_com_chk > td.left > span").find("img").attr("src");
						var im=new Discord.MessageAttachment(img,"character.png");
						var serverimg=$("tr.search_com_chk>td>dl>dt").find("img").attr("src");
						var datar = $("tr.search_com_chk>td>dl>dd").eq(0).text();//공홈파싱
						var job = datar.split("/")[1].split("\">\"")[0];//직업
					}
					
					const embed1 = new Discord.MessageEmbed()
						.setTitle("["+nick+"] 님의 메창력")
						.setURL("https://maple.gg/u/"+nick)
						.setThumbnail(serverimg)
						.setImage("attachment://character.png")
						.addFields(
							{ name: "직업", value: job, inline: true },
							{ name: "레벨", value: "Lv."+lev, inline: true },
							{ name: "무릉", value: murung+"층", inline: true },
							{ name: "유니온", value: "Lv."+union, inline: true }
						)
						.setDescription(result[res]+" ("+judge+"점)");
					msg.channel.send({ embeds: [embed1],files:[im] });
				}
			}
			catch(e)
			{
				const embed1 = new Discord.MessageEmbed()
					.setTitle("["+nick+"] 님의 메창력")
					.setDescription("본캐여부를 확인해주세요!\n본캐(월드 내 가장 레벨이 높은 캐릭터)가 아니면 측정할 수 없습니다.");
				msg.channel.send({ embeds: [embed1] });
			}

		}
		
    };

exports.name='메창';
