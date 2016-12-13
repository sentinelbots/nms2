const request = require('superagent');

exports.run = (client) => {
  client.user.setGame("Say: spambot.help");
  post_carbonitex_server_count(client);
  setInterval(()=> {
    post_carbonitex_server_count(client);
  }, 3600000);
};

function post_carbonitex_server_count(client) {
  request
  .post(`https://www.carbonitex.net/discord/data/botdata.php`)
  .send(`{"key": "${client.config.carbon.key}", "servercount": ${client.guilds.size}}`)
  .type('application/json')
  .set('Accept', 'application/json')
  .end(err => {
      if (err) return console.error(err);
  });
}