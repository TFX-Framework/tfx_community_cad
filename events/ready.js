const { readdirSync } = require("fs")
const { join } = require("path")
const filePath2 = join(__dirname, "..", "events");
const eventFiles2 = readdirSync(filePath2);
const timers = require("timers");
const fetch = require('node-fetch');
const package = require('../package.json')


module.exports = async (client) => {

  const ready_channel = client.channels.cache.find(c => c.id === "810704931614490685");

  let offlineColor ='#BF1313'
  let onlineColor ='#3FCF45'

let activities = [
    {
      name: 'cad.toxicfx.org',
      options: {
        type: 'STREAMING',
        url: "https://www.twitch.tv/monstercat"
      }
    }
  ];
  let i = 0;


   console.log(`Signed in as ${client.user.username} || Loaded [${eventFiles2.length}] event(s) & [${client.commands.size}] command(s)`);
   timers.setInterval(() => {
    i = i == activities.length ? 0 : i;
   client.user.setActivity(activities[i].name, activities[i].options);
    i++;
  }, 30000);

  await fetch('https://api.toxicfx.org/api/v1/versions/api')
      .then(res => res.json())
      .then(json => {

            if (json.currentVersion === package.version) {
              
            let up_to_date = new MessageEmbed()
            .setAuthor('Version Check: Deploy Successful', 'https://toxicfx.org/images/TFX-Transparent.png')
            .setColor(onlineColor)
            .setDescription('ToxicFX Community CAD is Up-To Date and Ready to go!!')
            .addField('Current Version', `v${package.version}`)
            .addField('Newest Version', `v${json.currentVersion}`)
            .setTimestamp()
            .setFooter('© 2021 ToxicFX', 'https://toxicfx.org/images/TFX-Transparent.png')
              
            return ready_channel.send(up_to_date);
              
            } else if (json.currentVersion !== package.version) { {
                let outdated = new MessageEmbed()
                .setAuthor('Version Check: Deploy Failed', 'https://toxicfx.org/images/TFX-Transparent.png')
                .setColor(offlineColor)
                .setDescription('ToxicFX Community CAD is Outdated, Please make sure its still deploying.')
                .addField('Current Version', `v${package.version}`)
                .addField('Newest Version', `v${json.currentVersion}`)
                .setTimestamp()
                .setFooter('© 2021 ToxicFX', 'https://toxicfx.org/images/TFX-Transparent.png')

                return ready_channel.send(outdated)
                  }
            }
      })
}
