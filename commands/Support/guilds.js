exports.run = (client, msg, [user]) => {
  if(!user && !client.users.has(msg.channel.name)) return msg.channel.sendMessage("No proper user specified.");
  if(!user) user = client.users.get(msg.channel.name);
  const guilds = client.guilds.filter(g=>g.members.has(user.id));
  msg.channel.sendMessage(`**User found in ${guilds.size} guilds**:\n` + guilds.map(g=>`${g.id} | ${g.name}`).join("\n"));
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 10,
  botPerms: [],
  requiredFuncs: []
};

exports.help = {
  name: "guilds",
  description: "Gets a raw list of guilds shared with the user.",
  usage: "[user:user]",
  usageDelim: ""
};
