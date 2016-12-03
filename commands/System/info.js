exports.run = (client, msg) => {
  msg.channel.sendMessage(`No-Mention-Spam protects against mention spammers: user bots that spam your server by mentioning multiple users in a single, or multiple, messages, in bursts.
It does *not* protect against any other kind of spam such as large messages, lots of text messages, images, invite links, etc etc.
NMS is now built on the Komada framework, a plug-and-play bot builder using the Discord.js library.

Both are made by LuckyEvie#4611 (aka \`root\`, user ID \`139412744439988224\`).
For more information on Komada visit: <https://komada.js.org>. To report NMS issues visit <https://github.com/eslachance/nms2>.

**NOTE**: Configuration is currently disabled. **The bot will still protect you** but it's set to 15 mentions default and cannot be changed.`);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["details", "what"],
  permLevel: 0,
  botPerms: [],
  requiredFuncs: []
};

exports.help = {
  name: "info",
  description: "Provides some information about this bot.",
  usage: "",
  usageDelim: ""
};
