const { CommandInteraction, MessageEmbed } = require('discord.js');

module.exports = {
    name: "embed",
    description: "Envoie un message par le bot en format embed",
    permission: "ADMINISTRATOR",
    options: [
        {
            name: "channel",
            description: "Mettre le channel ou envoyer le message ex :(#channel)",
            type: "CHANNEL",
            required: true
        },
        {
            name: "titre",
            description: "Indiqué le titre du message !",
            type: "STRING",
            required: true
        },
        {
            name: "description",
            description: "Indiqué la description du message !",
            type: "STRING",
            required: true
        },
    ], 
    /**
    * @param {CommandInteraction} interaction
    */

    async execute(interaction){
        const { channel, options } = interaction;
        let ChannelReceive = options.getChannel("channel")
        let Titre = options.getString("titre")
        let Description = options.getString("description")

        const TicketEmbed = new MessageEmbed()
            .setColor('#252057')
            .setThumbnail('https://zupimages.net/up/21/48/fy8g.png')
            .setTitle(`**${Titre}**`)
            .setDescription(Description)
        await ChannelReceive.send({embeds: [TicketEmbed],}).then(() => {
            const TicketEmbed2 = new MessageEmbed() 
            .setColor('#252057')
            .setThumbnail('https://zupimages.net/up/21/48/fy8g.png')
            .setDescription("✔️ - Message envoyé avec succès dans le channel ["+ ChannelReceive.name+"]")
                interaction.reply({embeds: [TicketEmbed2]}).then(() =>{
                    setTimeout(function () {
                        interaction.deleteReply();
                    }, 10000)
                })
          });
    }
}
