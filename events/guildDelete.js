exports.run = (client, guild) => {
  if(!guild.available) return;
  client.funcs.log(`Guild Removed: ${guild.name}. Now at ${client.guilds.size}.`);
};
