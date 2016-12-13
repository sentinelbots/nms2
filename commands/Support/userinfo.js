const moment = require("moment");

exports.run = (client, msg, [user]) => {
  if(!user && !client.users.has(msg.channel.name)) return msg.channel.sendMessage("No proper user specified.");
  if(!user) user = client.users.get(msg.channel.name);
	if(!user) return msg.channel.sendMessage("Could not find user.");

	let embed = {
		color: 3447003,
		author: {
			name: `${user.username}#${user.discriminator} (${user.id})`,
			icon_url: user.avatarURL ? user.avatarURL : client.user.avatarURL // eslint-disable-line camelcase
		},
		fields: [
			{
				name: '❯ User Details',
				value: `
• Created at: ${moment.utc(user.createdAt).format('dddd, MMMM Do YYYY, HH:mm:ss ZZ')}${user.bot ? '\n• Is a bot account' : ''}
• Status: ${user.presence.status}
• Game: ${user.presence.game ? user.presence.game.name : 'None'}\n\u200B
				`
			}
		],
		thumbnail: { url: user.avatarURL },
		timestamp: new Date(),
		footer: {
			icon_url: client.user.avatarURL, // eslint-disable-line camelcase
			text: 'User info'
		}
	};

  const guilds = client.guilds.filter(g=>g.members.has(user.id));
  const guildList = guilds.size > 0 ? guilds.map(g=>`\`${g.name} (${g.id})\``).join("\n") : "None";
	embed.fields.push({
		name: `❯ Shared Servers (${guilds.size})`,
		value: `${guildList}`
	});

	if(msg.guild) {
		const member = msg.guild.member(user);
		if(!!member) {
			embed.fields.push({
			name: '❯ Member Details',
			value: `${member.nickname !== null ? ` • Nickname: ${member.nickname}` : '• No nickname'}
• Roles: ${member.roles.map(roles => `\`${roles.name}\``).join(', ')}
• Joined at: ${moment.utc(member.joinedAt).format('dddd, MMMM Do YYYY, HH:mm:ss ZZ')}
`});
		}
	}


	msg.channel.sendMessage("", {embed});
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["details", "what"],
  permLevel: 10,
  botPerms: [],
  requiredFuncs: []
};

exports.help = {
  name: "userinfo",
  description: "Gives global user information",
  usage: "[user:user]",
  usageDelim: ""
};
