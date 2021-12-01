const { MessageEmbed, Message, WebhookClient } = require("discord.js");
const Config = require("../../Structures/config.json");

module.exports = {
    name: "messageDelete",
    /**
     * 
     * @param {Message} message
     */
    
    async execute(message) {
        if (message.author.bot) return;

        const Log = new MessageEmbed()
        .setColor('#252057')
        .setDescription(`📒 Un [message](${message.url}) de ${message.author.tag} à été **supprimer** du channel ${message.channel}.\n
        **Message supprimer**:\n ${message.content ? message.content : "None"}`)
        .setFooter(`Membre: ${message.author.tag} | ID: ${message.author.id}`.slice(0,4096))

        if(message.attachments.size >= 1){
            Log.addField(`Attachments:`,`${message.attachments.map(a => a.url)}`, true)
        }

        new WebhookClient({url: Config.message_logs}).send({embeds: [Log]}).catch((err) => console.log(err))

    }
}