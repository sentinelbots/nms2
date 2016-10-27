exports.run = (client, msg, [action, key, value]) => {
  if(action === "list") {
    msg.channel.sendCode(null, msg.guildConf);
    return;
  } else

  if(action === "get") {
    if(!key) return msg.reply("Please provide a key you wish to view");
    msg.reply(`The value for ${key} is currently: ${msg.guildConf[key]}`);
    return;
  } else

  if(action === "set") {
    if(!key || !value) return msg.reply("Please provide both a key and value!");
    //client.funcs.confs.set(client, msg.guild, key, value);
    return msg.reply("I'm working on it, boss!");
  } else

  if(action === "reset") {
    if(!key) return msg.reply("Please provide a key you wish to reset");
    client.funcs.confs.resetKey(client, msg.guild, key);
    return msg.reply("The key has been reset.");
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 3,
  botPerms: [],
  requiredFuncs: []
};

exports.help = {
  name: "conf",
  description: "Define per-server configuration.",
  usage: "<set|get|reset|list> [key:str] [channel:channel|user:user|str:str|int:int]",
  usageDelim: " "
};
