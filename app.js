const Discord=require('discord.js');
const client = new Discord.Client({
  intents: [
    Discord.Intents.FLAGS.GUILDS,
    Discord.Intents.FLAGS.GUILD_MESSAGES
  ]
});
const fs = require('fs');
const prefix = '';
var i;
var ar;

client.commands = new Discord.Collection() 
// 명령어 캐시 컬렉션을 클라이언트 내에 선언한다. 해당 방법으로 명령어 파일 내에서도 client.commands로 다른 명령어들에 접근할수 있다.

client.commands.load = dir => {
    for (const file of fs.readdirSync(dir)) {
      const cmd = require(`./commands/${file}`);
      client.commands.set(cmd.name, cmd);
    }
    console.log(client.commands.map(c => c.name).join(', ') + ' 명령어가 로드됨.');
}

client.commands.load(__dirname + "/commands");
//해당 파일이 위치한 디렉터리에서 "/commands" 경로를 추가

ar=new Array(client.commands.map(c => c.name));
client.on('ready', () => console.log(`${client.user.tag} 에 로그인됨`));

client.on('message', msg => {
    if (msg.author.bot) return;
    const args = msg.content.slice(prefix.length).trim().split(' ');

for(i=0;i<ar[0].length;i++)
    {
const command = ar[0][i];
    let cmd = client.commands.get(command);
    //get는 컬렉션 내에 해당 key 값을 가진 데이터가 없으면 falsy 값을 반환하므로 부분적으로 Collection#has처럼 사용할수 있습니다.
cmd.run(client, msg, args);
}
})

client.login('I removed here because its my token');

/*출처: https://namu.wiki/w/discord.js#s-3.2 나무위키 2번 예제 기반으로
원래의 소스는 메시지의 앞부분만 명령어로 감지했으나, 카톡봇 구동 원리와 비슷하게 메시지가 올 때마다 전체 소스들이 돌아가며
명령어 감지는 소스에서 자체적으로 감지하도록 수정
(이렇게 하면 명령어가 중간이나 뒤에 있어도 감지가 가능하며, 하나의 기능에 넣을 수 있는 명령어 다양화 가능)
*/
