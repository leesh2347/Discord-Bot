const Discord = require('discord.js');
var max=0;
var kill=0;
playerList = [];
order = [];
playerid=[];
playerList2=[];
var start = false;
var leader = "없음";
var nowTurn = "없음";
var turnnum=0;
var nowguild="없음";
var nowchannel="없음";

Array.prototype.shuffle = function() {
return this.sort(_ => Math.random() - 0.5)
}

function brReset()
{
playerList = []
playerList2=[]
order = []
playerid=[]
start = false
leader = "없음"
nowTurn = "없음"
turnnum=0
nowguild="없음"
nowchannel="없음"
max=0
kill = 0
}

function showhelp(client, msg, args)
{
   msg.channel.send("러시안룰렛 게임\n\n/룰렛 입장\n/룰렛 퇴장\n/룰렛 시작\n\n*2인 이상부터 게임 진행이 가능합니다.")
}

function enterroom(client, msg, args)
{
if((nowchannel!="없음"&&nowchannel!=msg.channel.name)||(nowguild!="없음"&&nowguild!=msg.guild.name))
msg.channel.send("[!] 다른 방 또는 채널에서 게임이 진행 중입니다.")
else{
if (!start) {
if (playerList.indexOf(msg.author.username)==-1) {
playerList.push(msg.author.username)
playerid.push(msg.author.id)
msg.channel.send("[!] <@"+msg.author.id+"> 님이 방에 입장하셨어요!\n\n"+playerList.map((a, b) => (b+1)+". "+a).join("\n"))
if (playerList.length==1) {
leader = msg.author.username
nowguild=msg.guild.name
nowchannel=msg.channel.name
msg.channel.send("[!] <@"+msg.author.id+"> 님이 방장입니다!")
}
} else {
msg.channel.send("[!] 이미 방에 입장하셨습니다!")
}
} 
else {
msg.channel.send("[!] 이미 게임이 시작되었습니다.")
}
}
}

function outroom(client, msg, args)
{
if((nowchannel!="없음"&&nowchannel!=msg.channel.name)||(nowguild!="없음"&&nowguild!=msg.guild.name))
msg.channel.send("[!] 다른 방 또는 채널에서 게임이 진행 중입니다.")
else{
if (!start) {
if (playerList.indexOf(msg.author.username)!=-1) {
playerid.splice(playerList.indexOf(msg.author.username), 1)
playerList.splice(playerList.indexOf(msg.author.username), 1)
msg.channel.send(("[!] <@"+msg.author.id+"> 님이 퇴장하셨어요!\n\n"+playerList.map((a, b) => (b+1)+". "+a).join("\n")).trim())
if (playerList.length==1) {
	leader = msg.author.username
   msg.channel.send("[!] <@"+playerid+"> 님이 방장입니다!")
}
if (playerList.length==0){
brReset()
msg.channel.send("[!] 모든 플레이어가 퇴장하였습니다!")
}
} else {
msg.channel.send("[!] 아직 방에 입장하지 않으셨습니다!")
}
} else {
msg.channel.send("[!] 게임 중에는 퇴장할 수 없습니다!")
}
}
}

function startgame(client, msg, args)
{
if((nowchannel!="없음"&&nowchannel!=msg.channel.name)||(nowguild!="없음"&&nowguild!=msg.guild.name))
msg.channel.send("[!] 다른 방 또는 채널에서 게임이 진행 중입니다.")
else{
if (!start) {
if (msg.author.username == leader) {
if (playerList.length > 1) {
start = true
playerList2=playerList;
order = playerList.shuffle()
max=playerList.length;
kill=Math.floor(Math.random()*max);
turnnum=0
nowTurn = order[turnnum]
msg.channel.send("[!] 게임을 시작합니다! <@"+playerid[playerList2.indexOf(order[turnnum])]+"> 님 부터 /탕 을 입력하여 방아쇠를 당겨 주세요.")
} else {
msg.channel.send("[!] 2인 이상이어야 게임을 시작할 수 있습니다!")
}
} else {
msg.channel.send("[!] 게임은 오직 방장만 시작할 수 있습니다.")
}
} else {
msg.channel.send("[!] 이미 게임이 시작되었습니다.")
}
}
}

function playgame(client, msg, args)
{
if (max==kill) {
nowTurn=order[turnnum]
playerList.splice(playerList.indexOf(order[turnnum]), 1)
msg.channel.send("[!] 타-앙!\n"+nowTurn+" 님이 사망하셨습니다.\nㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ잘가시게\n야 우냐? 울어? 한판더?")
brReset()
} else {
turnnum++
max--
if(turnnum==playerList.length)
   turnnum=0
msg.channel.send("[!] 철컥. ("+max+"발 남음)")
msg.channel.send("[!] 다음은 <@"+playerid[playerList2.indexOf(order[turnnum])]+"> 님 차례입니다.")
}
}

//run이라는 메소드(function)을 export(수출)
exports.run = (client, msg, args) => {
	if(args[0]=="/룰렛")
	{
   if(args[1]=="입장")
      enterroom(client, msg, args);
   else if(args[1]=="퇴장")
      outroom(client, msg, args);
   else if(args[1]=="도움말")
      showhelp(client, msg, args);
	else if(args[1]=="시작")
		startgame(client, msg, args);
   }
   else if(start&&msg.content=="/탕"){
	   if(order[turnnum]==msg.author.username&&nowchannel==msg.channel.name&&nowguild==msg.guild.name)
		playgame(client, msg, args);
   }
    };

exports.name='러시안룰렛';