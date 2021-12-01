const { MessageEmbed, Message, WebhookClient } = require("discord.js");
const Config = require("../../Structures/config.json");

module.exports = {
    name: "messageUpdate",
    /**
     * 
     * @param {Message} oldMessage 
     * @param {Message} newMessage 
     */
    async execute(oldMessage, newMessage) {
        if (oldMessage.author.bot) return;
        if (oldMessage.content === newMessage.content) return;

        console.log(newMessage)
        const Count = 1950;
        const Original = oldMessage.content.slice(0, Count) + (oldMessage.content.length > 1950 ? " ..." : "");
        const Edited = newMessage.content.slice(0, Count) + (newMessage.content.length > 1950 ? " ..." : "");
        const Log = new MessageEmbed()
        .setColor('#252057')
        .setDescription(`📒 Un [message](${newMessage.url}) de ${newMessage.author} à été **modifier** du channel ${newMessage.channel}.\n
        **Original**:\n ${Original} \n **Modifié**:\n ${Edited}`.slice("0", "4096"))
        .setFooter(`Membre: ${newMessage.author.tag} | ID: ${newMessage.author.id}`)

        new WebhookClient({url: Config.message_logs}).send({embeds: [Log]}).catch((err) => console.log(err))

    }
}