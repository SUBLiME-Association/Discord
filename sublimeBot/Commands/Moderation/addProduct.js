const { Client, CommandInteraction, MessageEmbed, MessageActionRow, MessageButton, Message } = require("discord.js");
const Config = require("../../Structures/config.json");

module.exports = {
    name: "addproduct",
    description: "Ajouter un produit a la vente",
    permission: "ADMINISTRATOR",
    options: [
        {
            name: "name",
            description: "Mettez le nom de la ressource exemple :(LS Custom) !",
            type: "STRING",
            required: true
        },
        {
            name: "libs",
            description: "Indiqué la libs de la ressource !",
            type: "STRING",
            required: true
        },
        {
            name: "framework",
            description: "Indiqué le framerwork necessaire !",
            type: "STRING",
            required: true
        },
        {
            name: "consomation",
            description: "Indiqué la consomation de la ressource !",
            type: "STRING",
            required: true
        },
        {
            name: "description",
            description: "Indiqué la description du produit !",
            type: "STRING",
            required: true
        },
        {
            name: "lientebex",
            description: "Indiqué le lien tebex du produit !",
            type: "STRING",
            required: true
        },
        {
            name: "lienreview",
            description: "Indiqué le lien de la vidéo du produit !",
            type: "STRING",
            required: true
        },
        {
            name: "lienimage",
            description: "Indiqué le lien de l'image !",
            type: "STRING",
            required: true
        },
    ], 
    /**
    * @param {CommandInteraction} interaction
    * @param {Client} client 
    */

    async execute(interaction, client){
        const { channel, options } = interaction;
        let Titre = options.getString("name")
        let Libs = options.getString("libs")
        let Framework = options.getString("framework")
        let Consomation = options.getString("consomation")
        let Description = options.getString("description")
        let LienTebex = options.getString("lientebex")
        let LienReview = options.getString("lienreview")
        let LienImage = options.getString("lienimage")

        let Guild = client.guilds.cache.find(g => g.id === Config.server_id);
        let yourchannel = Guild.channels.cache.find(channel => channel.id === Config.store)
        
        const row = new MessageActionRow().addComponents(
                new MessageButton()
                    .setLabel('💵 Buy')
                    .setStyle('LINK')
                    .setURL(LienTebex),
                new MessageButton()
                    .setLabel('🎬 Review')
                    .setStyle('LINK')
                    .setURL(LienReview)
        );
        const TicketEmbed = new MessageEmbed()
            .setColor('#252057')
            .setThumbnail('https://zupimages.net/up/21/48/fy8g.png')
            .setTitle(`**__${Titre}__**`)
            .addFields(
                { name: '\u200B', value: '**Libs** : '+Libs },
                { name: '\u200B', value: '**Framework** : '+Framework },
                { name: '\u200B', value: '**Consomation** : '+Consomation },
                { name: '\u200B', value: '**Description** : '+Description },
            )
            .setImage(LienImage)
        await yourchannel.send({embeds: [TicketEmbed], components: [row]}).then(() => {
            const TicketEmbed2 = new MessageEmbed() 
            .setColor('#252057')
            .setThumbnail('https://zupimages.net/up/21/48/fy8g.png')
            .setDescription("✔️ - Message envoyé avec succès dans le channel ["+ yourchannel.name+"]")
                interaction.reply({embeds: [TicketEmbed2]}).then(() =>{
                    setTimeout(function () {
                        interaction.deleteReply();
                    }, 10000)
                })
          });

    }
}
