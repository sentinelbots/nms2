const slowmode = new Map();
const timers = [];
const ratelimit = 7500;

exports.run = (client, msg) => {
  // Ignore DMS, Webhooks, Mods, and break if no perms
  if(msg.author.bot || !msg.guild || !msg.member || !msg.guild.member(client.user).hasPermission("BAN_MEMBERS") || msg.member.hasPermission("MANAGE_MESSAGES")) return;

  if(msg.mentions.users.size == 1 && msg.mentions.users.first().bot) return;

  if(msg.mentions.users.size > 0) {
   client.funcs.log(`[MENTION][s${msg.guild.id}][u${msg.author.id}][m${msg.mentions.users.size}] ${msg.guild.name}/${msg.channel.name}/${msg.author.username} : [${msg.mentions.users.first().id}]`);
 }
  let conf = client.funcs.confs.get(msg.guild);

  if(!conf.nmsBanLevel) {
    conf.nmsBanLevel = 10;
    client.funcs.confs.addKey(client, "nmsBanLevel", 10);
  }

  let entry = slowmode.get(msg.author.id);
  if(!entry) {
    entry = {id: msg.author.id, count: 0};
    slowmode.set(msg.author.id, entry);
  }
  entry.count += msg.mentions.users.size + msg.mentions.roles.size;

  if(entry.count > conf.nmsBanLevel) {
    client.funcs.log.log(`[${msg.guild.name}] ${msg.author.username} spamming mentions x${entry.count}`);
    msg.member.ban(1).then( member=> {
      msg.channel.sendMessage(`:no_entry_sign: User ${msg.author.username} has just been banned for mentionning too many users. :hammer:
  Users that have been mentioned, we apologize for the annoyance. Please don't be mad!`);
      client.funcs.log(`[${msg.author.id}] Banned ${msg.author.username} from ${msg.guild.name} for mentioning too many users (${msg.mentions.users.size}).`);
    })
    .catch(e=> client.funcs.log(`[${msg.author.id}] Tried to ban ${msg.author.username} from ${msg.guild.name} but they have a higher role.`));
  }

  setTimeout(()=> {
    entry.count -= msg.mentions.users.size;
    if(entry.count <= 0) slowmode.delete(msg.author.id);
  }, ratelimit);

  if(parseInt(conf.nmsBanLevel, 10) > 0 && msg.mentions.users.size >= parseInt(conf.nmsBanLevel, 10)) {
    msg.member.ban(1).then( member=> {
      msg.channel.sendMessage(`:no_entry_sign: User ${msg.author.username} has just been banned for mentionning too many users. :hammer:
  Users that have been mentioned, we apologize for the annoyance. Please don't be mad!`);
      client.funcs.log(`[${msg.author.id}] Banned ${msg.author.username} from ${msg.guild.name} for mentioning too many users (${msg.mentions.users.size}).`);
    })
    .catch(e=> client.funcs.log(`[${msg.author.id}] Tried to ban ${msg.author.username} from ${msg.guild.name} but they have a higher role.`));

    return;
  }
};
