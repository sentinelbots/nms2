exports.run = (client, msg) => {
  msg.channel.sendMessage(`To add ${client.user.username} to your discord guild: \n <https://discordapp.com/oauth2/authorize?&client_id=${client.config.clientID}&scope=bot&permissions=4>`);
};

exports.help = {
  name: "invite",
  description: "Displays the join server link of the bot.",
  usage: "",
  usageDelim: ""
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0,
  botPerms: [],
  requiredFuncs: []
};
