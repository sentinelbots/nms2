var heapdump = require('heapdump');

exports.run = (client, msg) => {
  heapdump.writeSnapshot(function(err, filename) {
    console.log('dump written to', filename);
  });
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["memory"],
  permLevel: 10,
  botPerms: [],
  requiredFuncs: []
};

exports.help = {
  name: "dump",
  description: "Creates a dump file.",
  usage: "",
  usageDelim: ""
};
