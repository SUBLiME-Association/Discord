const { Client, CommandInteraction, MessageEmbed } = require("discord.js");


module.exports = {
    name: "closeticket",
    description: "Ferme le ticket",
    permission: "ADMINISTRATOR",

    /**
     * 
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     */

    async execute(interaction, client) {
        const TicketEmbed = new MessageEmbed() 
            .setColor('#252057')
            .setThumbnail('https://zupimages.net/up/21/48/fy8g.png')
            .setTitle('**Tickets**')
            .setDescription('__Fermeture en cours...__')
            .addFields({ name: `\u200B`, value: 'Le ticket va être supprimer dans 20 secondes... !' },)
            let NewTicketEmbedToClose = await interaction.channel.send({embeds: [TicketEmbed]}).then(() => {
                TimeCloseTicket =  setTimeout(function(){ 
                    interaction.channel.delete()
                    }, 20000);
            })
    }
}
