const { Client, CommandInteraction, MessageEmbed, MessageActionRow, MessageButton, Message } = require("discord.js");
const Config = require("../../Structures/config.json");

let TimeCloseTicket

module.exports = {
    name: "interactionCreate",
    /**
     * 
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {
        if(interaction.isCommand() ) {
            const command = client.commands.get(interaction.commandName);
            if(!command) return interaction.reply({embeds: [
                new MessageEmbed()
                .setColor("#252057")
                .setDescription("❌ Une erreur est survenu !")
            ]}) && client.commands.delete(interaction.commandName)
            command.execute(interaction, client)
        }

        if(interaction.isButton()) {
            if (interaction.customId === "ButtonTicket") {
                let Guild = client.guilds.cache.find(g => g.id === Config.server_id);
                let categoryID = Guild.channels.cache.find(channel => channel.name == interaction.user.username);
                if (!categoryID) {
                    Guild.channels.create(interaction.user.username, {
                        permissionOverwrites: [
                            {id: interaction.user.id, allow: ['SEND_MESSAGES', 'VIEW_CHANNEL'],},
                            {id: Guild.roles.everyone, deny: ['VIEW_CHANNEL'],},
                        ],
                        type: "text" }).then(async channel => {
                                const row = new MessageActionRow()
                                    .addComponents(
                                        new MessageButton()
                                            .setCustomId('CloseTicket')
                                            .setLabel('📩 Fermer le ticket')
                                            .setStyle('DANGER'),
                                );
                                const TicketEmbed = new MessageEmbed() 
                                    .setColor('#252057')
                                    .setThumbnail('https://zupimages.net/up/21/48/fy8g.png')
                                    .setTitle('**Tickets**')
                                    .addFields(
                                        { name: `__Bienvenue dans votre ticket__ **${interaction.user.username}** !`, value: 'S\'il vous plait, soyez patient un staff vous prendra en charge dès que possible !' },
                                        { name: `__Fermer le ticket__ !`, value: 'Pour fermer le ticket appuyez sur le boutton ci-dessous ou effectuer la commande suivante : [**/closeticket**] !' },
                                    )
                                await channel.send({embeds: [TicketEmbed], components: [row]});
                     })
                } else {
                    interaction.reply({ content: 'Vous avez déjà un ticket ouvert !', ephemeral: true })
                }
            }

            if (interaction.customId === "CloseTicket") {
                interaction.message.delete()

                const row = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                        .setCustomId('CancelCloseTicket')
                        .setLabel('Annuler')
                        .setStyle('DANGER'),
                );
                const TicketEmbed = new MessageEmbed() 
                    .setColor('#252057')
                    .setThumbnail('https://zupimages.net/up/21/48/fy8g.png')
                    .setTitle('**Tickets**')
                    .setDescription('__Fermeture en cours...__')
                    .addFields({ name: `\u200B`, value: 'Le ticket va être supprimer dans 20 secondes... !' },)
                    let NewTicketEmbedToClose = await interaction.channel.send({embeds: [TicketEmbed], components: [row]}).then(() => {
                        TimeCloseTicket =  setTimeout(function(){ 
                            interaction.channel.delete()
                         }, 20000);
                    })
            }

            if (interaction.customId === "CancelCloseTicket") {
                clearTimeout(TimeCloseTicket)
                interaction.message.delete().then(async channel => {
                    const row = new MessageActionRow()
                        .addComponents(
                            new MessageButton()
                                .setCustomId('CloseTicket')
                                .setLabel('📩 Fermer le ticket')
                                .setStyle('DANGER'),
                    );
                    const TicketEmbed = new MessageEmbed() 
                        .setColor('#252057')
                        .setThumbnail('https://zupimages.net/up/21/48/fy8g.png')
                        .setTitle('**Tickets**')
                        .addFields(
                            { name: `__Bienvenue dans votre ticket__ **${interaction.user.username}** !`, value: 'S\'il vous plait, soyez patient un staff vous prendra en charge dès que possible !' },
                            { name: `__Fermer le ticket__ !`, value: 'Pour fermer le ticket appuyez sur le boutton ci-dessous ou effectuer la commande suivante : [**!close**] !' },
                        )
                        interaction.channel.send({embeds: [TicketEmbed], components: [row]});
                })
            }
        }
    }
}
