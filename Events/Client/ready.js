const { MessageActionRow, MessageButton, MessageEmbed, Message, WebhookClient } = require('discord.js');
const Config = require("../../Structures/config.json");




module.exports = {
    name: "ready",
    once: true,
    async execute(client) {
        console.log("☀️  - Bot Initialized ")

        // TICKET MESSAGE //

            // let Guild = client.guilds.cache.find(g => g.id === Config.server_id);
            // let yourchannel = Guild.channels.cache.find(channel => channel.id === "908711141629378640")
            // await yourchannel.bulkDelete(2, true).then(() => {
            //     setTimeout(function (){
            //         const row = new MessageActionRow()
            //             .addComponents(new MessageButton()
            //                 .setCustomId('ButtonTicket')
            //                 .setLabel('📩 Ouvrir un ticket')
            //                 .setStyle('PRIMARY'),
            //         );
            //         const TicketEmbed = new MessageEmbed() 
            //         .setColor('#252057')
            //         .setThumbnail('https://zupimages.net/up/21/48/fy8g.png')
            //         .setTitle('**Tickets**')
            //         .addFields(
            //             { name: '__Contacter le staff !__', value: 'Pour toute question, commande ou report, n\'hésite pas à ouvrir un ticket à l\'aide du boutton ci-dessous !' },
            //             { name: '\u200B', value: '\u200B' },
            //             { name: '__Attention__', value: 'Pour tout les tickets jugée inutiles ou/et abusive sera sanctionné.'},
            //         )
            //         .setTimestamp()
            //         yourchannel.send({embeds: [TicketEmbed], components: [row]})
            //     }, 2500);
            // })
    }
}