const Discord = require('discord.js');
var cheerio = require('cheerio');
const {fetch} = require('undici');

async function isreboot(nick){
	var l=await(await fetch("https://maple.gg/u/"+encodeURIComponent(nick))).text();
	var $ = cheerio.load(l);
	var isre=$("#container > div > div > div:nth-child(4)").text();
	if(isre!="랭킹정보가 없습니다.")
		return 1;
	else
		return 2;
}

//run이라는 메소드(function)을 export(수출)
exports.run = async (client, msg, args) => {
		if(msg.content.split(" ")[0]=="@메이플")
		{
			var nick=msg.content.split("@메이플 ")[1];
			var url = "https://maplestory.nexon.com/Ranking/World/Total?c="+encodeURIComponent(nick);
			try{
				var isr=await isreboot(nick);
				if(isr==1)
				{
					var l=await(await fetch(url)).text();
					var $ = cheerio.load(l);
					var img = $("#container > div > div > div:nth-child(4) > div.rank_table_wrap > table > tbody > tr.search_com_chk > td.left > span").find("img").attr("src");
					var im=new Discord.MessageAttachment(img,"character.png");
				  var datar = $("tr.search_com_chk>td>dl>dd").eq(0).text();//공홈파싱
				  var job = datar.split("/")[1].split("\">\"")[0];//직업
				  var serverimg=$("tr.search_com_chk>td>dl>dt").find("img").attr("src");
				  var lv = $("tr.search_com_chk>td").eq(2).text().replace("Lv.", "");//td 3번째줄, 'Lv.'은 보기 좀 그래서 삭제
				  var exp = $("tr.search_com_chk>td").eq(3).text();//td 4번째줄
				  var pop = $("tr.search_com_chk>td").eq(4).text();//td 5번째줄
				  var gu = $("tr.search_com_chk>td").eq(5).text();//td 6번째줄
				  if(gu==""||gu==null||gu==undefined)
					  gu="(없음)";
					const embed1 = new Discord.MessageEmbed()
						.setTitle("["+nick+"] 님의 정보")
						.setURL("https://maple.gg/u/"+nick)
						.setThumbnail(serverimg)
						.setImage("attachment://character.png")
						.addFields(
							{ name: "직업", value: job, inline: true },
							{ name: "레벨", value: "Lv."+lv, inline: true },
							{ name: "인기도", value: pop, inline: true },
							{ name: "길드", value: gu, inline: true }
						);
					msg.channel.send({ embeds: [embed1],files:[im] });
					
				}
				else
				{
					var l=await(await fetch(url+"&w=254")).text();
					var $ = cheerio.load(l);
					var img = $("#container > div > div > div:nth-child(4) > div.rank_table_wrap > table > tbody > tr.search_com_chk > td.left > span").find("img").attr("src");
					var im=new Discord.MessageAttachment(img,"character.png");
				  var datar = $("tr.search_com_chk>td>dl>dd").eq(0).text();//공홈파싱
				  var job = datar.split("/")[1].split("\">\"")[0];//직업
				  var serverimg=$("tr.search_com_chk>td>dl>dt").find("img").attr("src");
				  var lv = $("tr.search_com_chk>td").eq(2).text().replace("Lv.", "");//td 3번째줄, 'Lv.'은 보기 좀 그래서 삭제
				  var exp = $("tr.search_com_chk>td").eq(3).text();//td 4번째줄
				  var pop = $("tr.search_com_chk>td").eq(4).text();//td 5번째줄
				  var gu = $("tr.search_com_chk>td").eq(5).text();//td 6번째줄
				  if(gu==""||gu==null||gu==undefined)
					  gu="(없음)";
					const embed1 = new Discord.MessageEmbed()
						.setTitle("["+nick+"] 님의 정보")
						.setURL("https://maple.gg/u/"+nick)
						.setThumbnail(serverimg)
						.setImage("attachment://character.png")
						.addFields(
							{ name: "직업", value: job, inline: true },
							{ name: "레벨", value: "Lv."+lv, inline: true },
							{ name: "인기도", value: pop, inline: true },
							{ name: "길드", value: gu, inline: true }
						);
					msg.channel.send({ embeds: [embed1],files:[im] });
					
				}
				
			}
			catch(e)
			{
				const embed1 = new Discord.MessageEmbed()
					.setTitle("["+nick+"] 님의 정보")
					.setDescription(e+"존재하지 않는 캐릭터 입니다.\n혹시 캐릭터가 있는데도 이 멘트가 보인다면 갱신 한번 해주세요~\nmaple.gg/u/"+nick);
				msg.channel.send({ embeds: [embed1] });
			}

		}
    };

exports.name='maplegg';
