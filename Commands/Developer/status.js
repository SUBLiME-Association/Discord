const { CommandInteraction, Client, MessageEmbed } = require("discord.js");


module.exports = {
    name: "status",
    description: "Montre le status client du bot [SUBLIME BOT]",
    permission: "SEND_MESSAGES",

    /**
     * 
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {
        const Response = new MessageEmbed()
        .setColor('#252057')
        .setDescription(`**Client**:\n \`🟢 CONNECTÉ\` - \`${client.ws.ping}ms \`\n **Depuis**:\n <t:${parseInt(client.readyTimestamp / 1000)}:R>\n`)
        .setThumbnail('https://zupimages.net/up/21/48/fy8g.png')

        interaction.reply({embeds: [Response]})
    }
}
