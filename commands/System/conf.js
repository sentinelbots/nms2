
exports.run = (client, msg, [action, key, value]) => {
  msg.channel.sendMessage("My apologies. For technical reasons, configuration is disabled for the moment. Please do not worry, I will still protect you using default configuration (10 mentions)!");
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 3,
  botPerms: [],
  requiredFuncs: []
};

exports.help = {
  name: "conf",
  description: "Define per-server configuration.",
  usage: "",
  /*usage: "<set|get|reset|list> [key:str] [channel:channel|user:user|role:role|int:int|str:str]",*/
  usageDelim: " "
};
