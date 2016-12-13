exports.conf = {
  enabled: true,
};

exports.run = async (client, msg) => {
  if (msg.content.startsWith(client.config.prefix) || client.config.prefixMention.test(msg.content)) return;
  if (msg.guild && msg.guild.id !== client.config.logGuild) return;
  const supportChannel = client.dmSupportChannels.find(c=>c.channelID === msg.channel.id);
  if (msg.guild && !supportChannel) return;

  if (msg.guild && !!supportChannel) {
    console.log("DMing User!: " + msg.content);
    client.users.get(msg.channel.name).sendMessage("", { embed: {
      color: 3447003,
      author: {
        name: `${msg.author.username} (${msg.author.id})`,
        icon_url: msg.author.avatarURL,
      },
      description: msg.content,
    } });
  } else {
    const channel = await client.funcs.dmSupport.getChannel(client, msg.author.id);
    channel.sendMessage("", { embed: {
      color: 3447003,
      author: {
        name: `${msg.author.username} (${msg.author.id})`,
        icon_url: msg.author.avatarURL,
      },
      description: msg.content,
    } });
  }
};
