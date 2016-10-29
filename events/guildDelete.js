exports.run = (client, guild) => {
  if(!guild.available) return;
  client.funcs.log(`Guild Removed: ${guild.name}.`);
};
