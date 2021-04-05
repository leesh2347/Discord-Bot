const Discord = require('discord.js');
var num;
var strike=0;
var ball=0;
var count=0;
var isplaying=0;
var play;
var pguild=" ";
var pchannel=" ";

function gamestart(client, msg, args)
{
if(isplaying==1)
msg.channel.send("이미 진행 중인 게임이 있습니다.");
else{
num=new Array(0,0,0);
play=new Array(0,0,0);
strike=0;
ball=0;
pguild=msg.guild.name;
pchannel=msg.channel.name;
msg.channel.send("새로운 게임이 생성되었습니다!");
num[0]=Math.floor(Math.random()*9)+1;
do{
num[1]=Math.floor(Math.random()*9)+1;
}while(num[0]==num[1]);
do{
num[2]=Math.floor(Math.random()*9)+1;
}while(num[0]==num[2]||num[1]==num[2]);
isplaying=1;
msg.channel.send("숫자 생성 완료!\n공을 3개 던져주세요!\n\n현재 도전 횟수: "+count+"회 (최대 10회)");
}
}

function showhelp(client, msg, args)
{
   msg.channel.send("/숫자야구 시작\n/숫자야구 (숫자) (숫자) (숫자)\n(1~9사이의 숫자만 가능합니다.)\n\n기회는 1게임당 10회씩 주어집니다.");
}

function playgame(client, msg, args)
{
if(isplaying==0)
msg.channel.send("진행 중인 게임이 없습니다.");
else if(pguild!=msg.guild.name||pchannel!=msg.channel.name)
{
msg.channel.send("다른 방 또는 채널에서 누군가가 게임을 진행 중입니다.");
}
else{
play[0]=args[1];
play[1]=args[2];
play[2]=args[3];
if(play[0]<1||play[0]>9||play[1]<1||play[1]>9||play[2]<1||play[2]>9)
msg.channel.send("1~9 사이의 숫자를 입력해 주세요.");
else
{
var i;
var j;
strike=0;
ball=0;
for(i=0;i<3;i++)
{
for(j=0;j<3;j++)
{
if(num[i]==play[j])
{
if(i==j)
strike++;
else
ball++;
}
}
}
if(strike==3)
{
msg.channel.send("축하합니다! \n정답은 "+num[0]+", "+num[1]+", "+num[2]+" 입니다.");
count=0;
strike=0;
ball=0;
isplaying=0;
pguild=" ";
pchannel=" ";
}
else
{
count++;
if(strike==ball&&strike==0&&ball==0)
msg.channel.send("Out입니다.\n현재 도전 횟수: "+count+"회 (최대 10회)");
else
msg.channel.send(strike+" Strike "+ball+" Ball 입니다.\n현재 도전 횟수: "+count+"회 (최대 10회)");
if(count>9)
{
msg.channel.send("도전 횟수를 모두 소모하여 게임이 종료됩니다.\n정답은 "+num[0]+", "+num[1]+", "+num[2]+" 입니다.");
count=0;
strike=0;
ball=0;
pguild=" ";
pchannel=" ";
isplaying=0;
}
}
}
}
}

//run이라는 메소드(function)을 export(수출)
exports.run = (client, msg, args) => {
	if(args[0]=="/숫자야구")
	{
   if(args[1]=="시작")
      gamestart(client, msg, args);
   else if(args[1]=="도움말")
      showhelp(client, msg, args);
   else
      playgame(client, msg, args);
      }
    };

exports.name='숫자야구';