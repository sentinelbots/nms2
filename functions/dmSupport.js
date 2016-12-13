const Discord = require("discord.js");
const path = require("path");
const fs = require("fs-extra-promise");
const moment = require("moment");
let logDir = null;

async function getChannelLogs(channel) {
  console.log(`Getting all logs from ${channel.name}`);
  return new Promise.resolve("blah");
};

exports.init = async (client) => {
  const logGuild = client.guilds.get(client.config.logGuild);
  if (!logGuild) return;
  let logChannel = logGuild.channels.find("name", "dm-logs");
  if (!logChannel) {
    logChannel = await logGuild.createChannel("dm-logs", "text");
    logChannel.sendMessage("This channel has been initialized by the Komada framework.");
  }
  client.log = (data, type = "log") => {
    logChannel.sendMessage(`**${type}**: ${type}`);
  };
  client.dmSupportChannels = new Discord.Collection();

  logDir = path.resolve(`${client.clientBaseDir}${path.sep}bwd${path.sep}dmSupport`);
  await fs.ensureDirAsync(logDir);
  fs.walk(logDir)
    .on("data", async (item) => {
      const fileinfo = path.parse(item.path);
      if (!fileinfo.ext) return;
      const userID = fileinfo.name;
      const supportChannel = await fs.readJSONAsync(path.resolve(`${logDir}${path.sep}${fileinfo.base}`));
      client.dmSupportChannels.set(userID, supportChannel);
    })
    .on("end", () => {
      client.funcs.log(`Loaded ${client.dmSupportChannels.size} Direct Messages for support.`);
    });
};

exports.getChannel = async (client, userID) => {
  const logGuild = client.guilds.get(client.config.logGuild);
  const user = client.users.get(userID);
  if (!logGuild) return false;
  if(client.dmSupportChannels.has(userID)) {
    return client.channels.get(client.dmSupportChannels.get(userID).channelID);
  } else {
    const logChannel = await logGuild.createChannel(userID, "text");
    const dmObject = {channelID: logChannel.id, created: logChannel.createdTimestamp, username: client.users.get(userID).username};
    client.dmSupportChannels.set(userID, dmObject);
    logDir = path.resolve(`${client.clientBaseDir}${path.sep}bwd${path.sep}dmSupport`);
    await fs.ensureFileAsync(path.resolve(`${logDir}${path.sep}${userID}.json`));
    fs.outputJSONAsync(path.resolve(`${logDir}${path.sep}${userID}.json`), dmObject);

	let embed = {
		color: 0xff0000,
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

  	logChannel.sendMessage("", {embed});



    return logChannel;
  }
};

exports.closeChannel = async (client, userID, saveLog = false) => {
  const logGuild = client.guilds.get(client.config.logGuild);
  if (!logGuild) return false;
  const logChannel = logGuild.channels.find("name", userID);
  if (!logChannel) return false;
  if (saveLog) {
    const logs = await client.getChannelLogs(logChannel);
    console.log(logs);
  }

  try {
    await logChannel.delete();
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
};
