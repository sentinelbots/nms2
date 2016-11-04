exports.run = (client, guild) => {
  if(!guild.available) return;
  client.funcs.log(`Guild Joined: ${guild.name}. Now at ${client.guilds.size}.`);
};
