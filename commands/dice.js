const Discord = require('discord.js');

//run이라는 메소드(function)을 export(수출)
exports.run = (client, msg, args) => {
	if(msg.content=="/주사위")
{
        var a = Math.floor((Math.random() * 100) + 1);
        if(a>0&&a<2)
 msg.channel.send("망이네요.....주사위가 "+a+" 나왔습니다.");
else if(a>1&&a<10)
 msg.channel.send("오늘의 운은 꽝이군요....주사위가 "+a+" 나왔습니다.");
else if(a>9&&a<20)
 msg.channel.send("어렵겠군요. 너무 슬퍼마세요....주사위가 "+a+" 나왔습니다.");
else if(a>19&&a<30)
 msg.channel.send("주사위는 아무 잘못이 없어요...주사위가 "+a+" 나왔습니다.");
else if(a>29&&a<40)
 msg.channel.send("괜찮아요, 다음엔 잘 나오겠죠. 주사위가 "+a+" 나왔습니다.");
else if(a>39&&a<50)
 msg.channel.send("조금 아깝네요...한번 더 해볼래요? 주사위가 "+a+" 나왔습니다.");
else if(a>49&&a<60)
 msg.channel.send("그래도 절반은 넘겼네요! 주사위가 "+a+" 나왔습니다.");
else if(a>59&&a<70)
 msg.channel.send("흠....나쁘진 않네요. 주사위가 "+a+" 나왔습니다.");
else if(a>69&&a<80)
 msg.channel.send("순전히 운빨! 좀 더 해봐요! 주사위가 "+a+" 나왔습니다.");
else if(a>79&&a<90)
 msg.channel.send("오호~대단하군요! 주사위가 "+a+" 나왔습니다.");
else if(a>89&&a<96)
 msg.channel.send("행운의 여신이 함께하길. 주사위가 "+a+" 나왔습니다.");
else if(a==100)
 msg.channel.send("AI 루시가 확실하게 보증합니다. 주사위가 "+a+" 나왔습니다!");
else
 msg.channel.send("AI 루시가 보증합니다. 주사위가 "+a+" 나왔습니다!");
}
    };

exports.name='주사위';