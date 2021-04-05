const Discord = require('discord.js');

function clean(text) {
  if (typeof(text) === "string")
    return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
  else
      return text;
}

//run이라는 메소드(function)을 export(수출)
exports.run = (client, msg, args) => {
	if(msg.content.startsWith("jolt "))
	{
    if(msg.author.id !== config.ownerID) return;
    try {
      const code = args.slice(1).join(" ");
      let evaled = eval(code);
 
      if (typeof evaled !== "string")
        evaled = require("util").inspect(evaled);
 
      msg.channel.send(clean(evaled), {code:"xl"});
    } catch (e) {
      msg.channel.send(`\`ERROR\` \`\`\`xl\n${clean(e)}\n\`\`\``);
    }
  }

    };

exports.name='eval';