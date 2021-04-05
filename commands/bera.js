const Discord = require('discord.js');
var limit = 31;
playerList = [];
isAI = [];
order = [];
playerid=[];
playerList2=[];
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
playerList2=[]
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
for(var a=0;a<playerList.length;a++)
{
   if(order[a]=="AI 플레이어"&&isAI[a]==0)
      isAI[a]=1
   else if(order[a]!="AI 플레이어"&&isAI[a]==1)
      isAI[a]=0
}
turnnum=0
nowTurn = order[turnnum]
if(isAI[turnnum]==1)
	msg.channel.send("[!] 게임을 시작합니다! "+order[turnnum]+" 님 부터 1, 2, 3 중 하나를 입력해 주세요.")
else
	msg.channel.send("[!] 게임을 시작합니다! <@"+playerid[playerList2.indexOf(order[turnnum])]+"> 님 부터 1, 2, 3 중 하나를 입력해 주세요.")
while(isAI[turnnum]==1)
{
total=total+Math.floor(Math.random()*3)+1
msg.channel.send("[!] AI 플레이어가 "+total+"을 입력하였습니다.")

if (total > limit-1) {
nowTurn=order[turnnum]
playerList.splice(playerList.indexOf(msg.author.username), 1)
msg.channel.send("[!] 이런, "+nowTurn+" 님이 탈락하였습니다! 게임 끝!\n\n[생존자]\n"+(playerList.map((a, b) => (b+1)+". "+a).join("\n")).trim())
brReset()
}
else
{
//nowTurn = order[((order.indexOf(nowTurn)+1)<(order.length))?(order.indexOf(nowTurn)+1):0]
turnnum++
if(turnnum==playerList.length)
   turnnum=0
if(isAI[turnnum]==1)
	msg.channel.send("[!] "+total+"\n"+order[turnnum]+" 님은 "+(total+1)+", "+(total+2)+", "+(total+3)+" 중 하나를 입력해 주세요.");
else
	msg.channel.send("[!] "+total+"\n<@"+playerid[playerList2.indexOf(order[turnnum])]+"> 님은 "+(total+1)+", "+(total+2)+", "+(total+3)+" 중 하나를 입력해 주세요.");
}
}

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
   if(msg.content.indexOf(".")!=(-1))
      msg.channel.send("[!] 소숫점은 사용할 수 없습니다.")
else if (1 <= Number(msg.content)-total && Number(msg.content)-total <= 3) {
total = Number(msg.content)
if (total > limit-1) {
nowTurn=order[turnnum]
playerList.splice(playerList.indexOf(order[turnnum]), 1)
msg.channel.send("[!] 이런, "+nowTurn+" 님이 탈락하였습니다! 게임 끝!\n\n[생존자]\n"+(playerList.map((a, b) => (b+1)+". "+a).join("\n")).trim())
brReset()
} else {
//nowTurn = order[((order.indexOf(nowTurn)+1)<(order.length))?(order.indexOf(nowTurn)+1):0]
turnnum++
if(turnnum==playerList.length)
   turnnum=0
if(isAI[turnnum]==1)
	msg.channel.send("[!] "+total+"\n"+order[turnnum]+" 님은 "+(total+1)+", "+(total+2)+", "+(total+3)+" 중 하나를 입력해 주세요.")
else
	msg.channel.send("[!] "+total+"\n<@"+playerid[playerList2.indexOf(order[turnnum])]+"> 님은 "+(total+1)+", "+(total+2)+", "+(total+3)+" 중 하나를 입력해 주세요.")
while(isAI[turnnum]==1)
{
total=total+Math.floor(Math.random()*3)+1
msg.channel.send("[!] AI 플레이어가 "+total+"을 입력하였습니다.")
if (total > limit-1) {
nowTurn=order[turnnum]
playerList.splice(playerList.indexOf(order[turnnum]), 1)
msg.channel.send("[!] 이런, "+nowTurn+" 님이 탈락하였습니다! 게임 끝!\n\n[생존자]\n"+(playerList.map((a, b) => (b+1)+". "+a).join("\n")).trim())
brReset()
}
else
{
//nowTurn = order[((order.indexOf(nowTurn)+1)<(order.length))?(order.indexOf(nowTurn)+1):0]
turnnum++
if(turnnum==playerList.length)
   turnnum=0
if(isAI[turnnum]==1)
	msg.channel.send("[!] "+total+"\n"+order[turnnum]+" 님은 "+(total+1)+", "+(total+2)+", "+(total+3)+" 중 하나를 입력해 주세요.")
else
	msg.channel.send("[!] "+total+"\n<@"+playerid[playerList2.indexOf(order[turnnum])]+"> 님은 "+(total+1)+", "+(total+2)+", "+(total+3)+" 중 하나를 입력해 주세요.")
}
}

   
}
} else {
msg.channel.send("[!] 숫자는 "+(total+1)+", "+(total+2)+", "+(total+3)+" 중 하나만 입력해 주세요.")
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
   else if(args[1]=="AI추가")
      addai(client, msg, args);
	else if(args[1]=="시작")
		startgame(client, msg, args);
   }
   else if(start&&!isNaN(msg.content)){
	   if(order[turnnum]==msg.author.username&&nowchannel==msg.channel.name&&nowguild==msg.guild.name)
		playgame(client, msg, args);
   }
    };

exports.name='베라';