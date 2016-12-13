const fs = require("fs-extra-promise");
const path = require("path");

exports.run = (client, msg) => {
  if(!client.users.has(msg.channel.name)) return msg.channel.sendMessage("This is not a support channel.");
  const user = client.users.get(msg.channel.name);
  if(!user) user = { id : msg.channel.name};
  if(client.dmSupportChannels.has(user.id)) {
    client.dmSupportChannels.delete(user.id);
    const logDir = path.resolve(`${client.clientBaseDir}${path.sep}bwd${path.sep}dmSupport`);
    fs.unlink(path.resolve(`${logDir}${path.sep}${user.id}.json`));
  }
  msg.channel.delete();

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
  name: "close",
  description: "Close a support channel (owner only)",
  usage: "",
  usageDelim: ""
};
