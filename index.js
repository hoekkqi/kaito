var Twit = require('twit')
var config = require('./config.json')
var D = require('discord.js')
var T = new Twit({
    consumer_key:        config.consumer_key,
    consumer_secret:      config.consumer_secret,
    access_token:         config.access_token,
    access_token_secret:  config.access_token_secret,
})
const client = new D.Client()
client.on('ready', () => {
    console.log('Using ' + client.user.tag + ' to get ready!')
    console.log('Ready!')
    console.log('Both Bots ready!')
})
let e = new D.RichEmbed()
client.on('message', message => {
    if (message.author.bot) return;
    if (message.author.id !== '318044130796109825') return;
  // Ignore messages not starting with the prefix (in config.json)
  if (message.content.indexOf(config.prefixJin) !== 0) return;
  // Our standard argument/command name definition.
  const args = message.content.slice(config.prefixJin.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  if(command === 'ev' || command === 'eval'){
    if(message.author.id !== '318044130796109825') return message.channel.send("`You're not my Developer!`");
    // ? Easy
    const pu = message.channel
    let command = message.content.slice(config.prefixJin.length);
    let split = command.split(" ");
    command = split[0];
    split.shift();
    let code = split.join(" ");
    try {
      let ev = require('util').inspect(eval(code));
    if (ev.length > 1950) {
      ev = ev.substr(0, 1950);
    }
    let token = config.tokenJin.replace(/\./g, "\.")
    let tooken = new RegExp(token, 'g')
    ev = ev.replace(tooken, `haha yes`);
    let e = new D.RichEmbed()
        e.addField("Input", "```js\n" + code + "```")
        .addField("Eval", "```js\n"+ev+"```")
        .setColor(0xf24946)
        message.channel.send(e)
  } catch(err) {
    message.channel.send(e.setDescription("```js\n" + err + "```"));
  }
}



  //   if(command === 'test'){
//       T.post('statuses/update', {
//           status: message.content.slice(config.prefixJin + command).trim().split(/ +/g)
//       },  function(err, data, response) {
//         console.log(data)
//         message.channel.send(data.text)
//       })
//   }
})
var users = ["2839919909"];
var stream = T.stream('statuses/filter', {track: '#codepupperBot, #commissions, #commissionsopen, #furry, #furryart, commissions open'});
stream.on('tweet', function (tweet) {
    if (users.indexOf(tweet.user.id_str) > -1) {
        console.log(tweet.user.name + ": " + tweet.text);
        e.setAuthor(tweet.user.name, tweet.user.profile_image_url_https)
         .setDescription(tweet.text)
         .setColor(tweet.user.profile_link_color)
         console.log(tweet.entities.user_mentions || 'None')
        client.channels.get('520213445119836171').send(e);
        T.post('statuses/retweet/:id', { id: tweet.id_str }, function (err, data, response) {
            // console.log(data)
        })
    }
})

client.login(config.tokenJin)