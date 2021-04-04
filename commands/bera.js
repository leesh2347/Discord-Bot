const Discord = require('discord.js');
var limit = 31;
playerList = [];
isAI = [];
order = [];
playerid=[];
var start = false;
var leader = "없음";
var nowTurn = "없음";
var turnnum=0;
var total = 0;
var nowguild="없음";
var nowchannel="없음";

Array.prototype.shuffle = function() {
return this.sort(_ => Math.random() - 0.5)
}

function brReset()
{
playerList = []
isAI = []
order = []
playerid=[]
start = false
leader = "없음"
nowTurn = "없음"
turnnum=0
nowguild="없음"
nowchannel="없음"
total = 0
}

function showhelp(client, msg, args)
{
   msg.channel.send("베스킨라빈스 게임\n\n/베라 입장\n/베라 퇴장\n/베라 AI추가\n/베라 시작\n/베라 종료\n\n*2인 이상부터 게임 진행이 가능합니다.")
}

function enterroom(client, msg, args)
{
if((nowchannel!="없음"&&nowchannel!=msg.channel.name)||(nowguild!="없음"&&nowguild!=msg.guild.name))
msg.channel.send("[!] 다른 방 또는 채널에서 게임이 진행 중입니다.")
else{
if (!start) {
if (playerList.indexOf(msg.author.username)==-1) {
playerList.push(msg.author.username)
isAI.push(0)
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

function addai(client, msg, args)
{
if((nowchannel!="없음"&&nowchannel!=msg.channel.name)||(nowguild!="없음"&&nowguild!=msg.guild.name))
msg.channel.send("[!] 다른 방 또는 채널에서 게임이 진행 중입니다.")
else{
if (!start) {
   if (playerList.length==0) {
msg.channel.send("[!] AI유저는 방장이 될 수 없습니다. 아무나 먼저 1명 이상 입장해 주세요!")
}
else
{
playerList.push("AI 플레이어")
isAI.push(1)
playerid.push(0)
msg.channel.send("[!] 게임에 AI 플레이어가 추가되었어요!\n\n"+playerList.map((a, b) => (b+1)+". "+a).join("\n"))
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
isAI.splice(playerList.indexOf(msg.author.username), 1)
playerid.splice(playerList.indexOf(msg.author.username), 1)
playerList.splice(playerList.indexOf(msg.author.username), 1)
msg.channel.send(("[!] <@"+msg.author.id+"> 님이 퇴장하셨어요!\n\n"+playerList.map((a, b) => (b+1)+". "+a).join("\n")).trim())
if (playerList.length==1) {
leader = msg.author.username
if(leader=="AI 플레이어")
   msg.channel.send("[!] "+playerList+" 님이 방장입니다!")
else
   msg.channel.send("[!] <@"+playerid+"> 님이 방장입니다!")
}
if (playerList.length==0||isAI.indexOf(0)==(-1)){
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

//run이라는 메소드(function)을 export(수출)
exports.run = (client, msg, args) => {
	if(args[0]=="/베라")
	{
   if(args[1]=="입장")
      enterroom(client, msg, args);
   else if(args[1]=="퇴장")
      outroom(client, msg, args);
   else if(args[1]=="도움말")
      showhelp(client, msg, args);
   else if(args[1]="AI추가")
      addai(client, msg, args);
   
   }
    };

exports.name='베라';