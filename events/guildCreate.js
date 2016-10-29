exports.run = (client, guild) => {
  if(!guild.available) return;
  client.funcs.log(`Guild Joined: ${guild.name}.`);
};
