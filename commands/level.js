const Discord = require('discord.js');
var cheerio = require('cheerio');
var request = require('request');

function getexp(index){
	request("http://wachan.me/exp_api.php?exp1="+index, function(error, response, html){
		if (error) {throw error};
		var textt="";
		var $ = cheerio.load(html);
		var l=$(this).text();
		var e = JSON.parse(l).result;
		return Number(parseInt(e.replace(/,/g,"")));
	});
}

function sum_cnt(index1,index2) {
	request("http://wachan.me/exp_api.php?exp1="+index1+"&exp2="+index2, function(error, response, html){
		if (error) {throw error};
		var textt="";
		var $ = cheerio.load(html);
		var l=$(this).text();
		var e = JSON.parse(l).result;
		return Number(parseInt(e.replace(/,/g,"")));
	});
}

function unitExp(remaintonext){
	tempNum = remaintonext/10000
	unit = "약 " + Number((Math.ceil(remaintonext/10000)))+ "만"
	jo = 0
	yuk = 0
	man = 0  
	if(tempNum>100000000){ //피 1조 이상     
	man = parseInt(tempNum%10000)
	tempNum=tempNum/10000
	yuk = parseInt(tempNum%10000)
	tempNum=tempNum/10000
	jo =parseInt(tempNum%10000)
	if(yuk==0 && man==0){
	unit = jo+"조 "   
	}else if(yuk==0){
	unit = jo+"조 "+man+"만"
	}else if(man==0){
	unit = jo+"조 "+yuk+"억 "
	}else{
	unit = jo+"조 "+yuk+"억 "+man+"만"
	}    
	}else if(tempNum>10000){ // 피 1억이상     
	man = parseInt(tempNum%10000)
	tempNum=tempNum/10000
	yuk = parseInt(tempNum%10000)
	if(man==0){
	unit = yuk+"억 "
	}else{
	unit = yuk+"억 "+man+"만"   
	}
	}else if(tempNum>100){ //피 100만이상    
	man = parseInt(tempNum%10000)
	unit = man+"만"  
	}
	// if(jo == 0){
	   // }else if()
	return unit 
}

//run이라는 메소드(function)을 export(수출)
exports.run = (client, msg, args) => {
		if(msg.content.split(" ")[0]=="@레벨")
		{
			var nick=msg.content.split("@레벨 ")[1];
			var url = "https://maplestory.nexon.com/Ranking/World/Total?c="+encodeURIComponent(nick);
				request(url, function(error, response, html){
					try{
						var textt="";
						var $ = cheerio.load(html);
						var data=$("#container > div > div > div:nth-child(4) > div.rank_table_wrap > table > tbody > tr.search_com_chk > td:nth-child(4)").text();
						var level=$("#container > div > div > div:nth-child(4) > div.rank_table_wrap > table > tbody > tr.search_com_chk > td:nth-child(3)").text().replace("Lv.", "");
						if(level>299){
							const embed1 = new Discord.MessageEmbed()
								.setTitle("["+nick+"]")
								.setDescription("\nLv."+level);
							msg.channel.send({ embeds: [embed1] });
						}
						else{
							var exp=data.replace(/,/g, "");     
							var per=(exp/getexp(level)*100).toFixed(3);
							var remaintonext=getexp(level)-exp;
							var remaintomax=sum_cnt(level,300)-exp;       
							 if((Math.ceil(remaintomax/10000000000000000)-1)>0){
								 const embed1 = new Discord.MessageEmbed()
									.setTitle("["+nick+"]")
									.setDescription("Lv."+level+"("+per+"%)\n다음 레벨까지 경험치\n"+unitExp(remaintonext)+"\n만렙까지 : "+(Math.ceil(remaintomax/10000000000000000)-1)+"경 "+Number((Math.ceil(remaintomax/1000000000000)-(Math.ceil(remaintomax/10000000000000000)-1)*10000)-1)+"조 "+(Math.ceil(remaintomax/100000000)-(Math.ceil((remaintomax/1000000000000)-1)*10000)-1)+"억");
								msg.channel.send({ embeds: [embed1] });
								 
							}else{
								const embed1 = new Discord.MessageEmbed()
									.setTitle("["+nick+"]")
									.setDescription("Lv."+level+"("+per+"%)\n다음 레벨까지 경험치\n"+unitExp(remaintonext)+"\n만렙까지 : "+Number((Math.ceil(remaintomax/1000000000000)-(Math.ceil(remaintomax/10000000000000000)-1)*10000)-1)+"조 "+(Math.ceil(remaintomax/100000000)-(Math.ceil((remaintomax/1000000000000)-1)*10000)-1)+"억");
								msg.channel.send({ embeds: [embed1] });
							}
						}
					}catch(error)
					{
						const embed1 = new Discord.MessageEmbed()
							.setTitle("["+nick+"]")
							.setDescription("없는 캐릭터명 입니다.");
						msg.channel.send({ embeds: [embed1] });
					}
				});
		}
    };

exports.name='레벨';
