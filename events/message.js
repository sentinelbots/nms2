const slowmode = new Map();
const ratelimit = 7500;

exports.run = (client, msg) => {

  let conf = client.funcs.confs.get(msg.guild);
  if(!conf.ban_level) {
    conf.ban_level = 10;
    client.funcs.confs.addKey("ban_level", 10);
    return;
  }

  // Ignore DMS, Webhooks, Mods, and break if no perms
  if(msg.author.bot || !msg.guild || !msg.member || !msg.guild.member(client.user).hasPermission("BAN_MEMBERS") || msg.member.hasPermission("MANAGE_MESSAGES")) return;

  // Ignore if 1 mention and it's a bot (bot interaction)
  if(msg.mentions.users.size == 1 && msg.mentions.users.first().bot) return;

  // If there is no trace of the author in the slowmode map, add him.
  let entry = slowmode.get(msg.author.id);
  if(!entry) {
    entry = 0;
    slowmode.set(msg.author.id, entry);
  }

  // Count BOTH user and role mentions
  entry += msg.mentions.users.size + msg.mentions.roles.size;

  // If the total number of mentions in the last `ratelimit` is above the server ban level... well, ban their ass.
  if(entry > conf.ban_level) {
    client.funcs.log(`[${msg.guild.name}] ${msg.author.username} spamming mentions x${entry}`);
    msg.member.ban(1).then( member=> {
      msg.channel.sendMessage(`:no_entry_sign: User ${msg.author.username} has just been banned for mentionning too many users. :hammer:
  Users that have been mentioned, we apologize for the annoyance. Please don't be mad!`);
      client.funcs.log(`[${msg.author.id}] Banned ${msg.author.username} from ${msg.guild.name} for mentioning too many users (${entry}).`);
    })
    .catch(e=> client.funcs.log(`[${msg.author.id}] Tried to ban ${msg.author.username} from ${msg.guild.name} but they have a higher role.`));
  } else {
    setTimeout(()=> {
      entry -= msg.mentions.users.size + msg.mentions.roles.size;
      if(entry <= 0) slowmode.delete(msg.author.id);
    }, ratelimit);
  }
};
