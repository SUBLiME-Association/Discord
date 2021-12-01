const { CommandInteraction, MessageEmbed } = require('discord.js');

module.exports = {
    name: "clear",
    description: "Supprime un certain nombre de message du channel",
    permission: "MANAGE_MESSAGES",
    options: [
        {
            name: "quantité",
            description: "Indiqué le nombre de message à supprimer ! (100 max)",
            type: "NUMBER",
            required: true
        },
        {
            name: "cible",
            description: "Indiqué une personne à cibler !",
            type: "USER",
            required: false
        }
    ], 
    /**
    * @param {CommandInteraction} interaction
    */
    async execute(interaction){
        const { channel, options } = interaction;
        let Amount = options.getNumber("quantité");
        const Target = options.getMember("cible");
        if (Amount === 0) {
            Amount = 1
        }
        if (Amount > 100) {
            Amount = 100
        }
        const Messages = await channel.messages.fetch();
        const Response = new MessageEmbed() 
        .setColor('#252057')
        .setDescription("")

        if(Target) {
            let i = 0;
            const filtered = [];
            (await Messages).filter((m) => {
                if(m.author.id === Target.id && Amount > i ) {
                    filtered.push(m);
                    i++;
                }
            })
            await channel.bulkDelete(filtered, true).then(message => {
                Response.setDescription(`Bot cleared \`${message.size}\` messages from ${Target} :broom:`)
                interaction.reply({embeds: [Response]}).then(() => {
                    setTimeout(function () {
                        interaction.deleteReply();
                    }, 2500);
                  });
            })
        } else {
            await channel.bulkDelete(Amount, true).then(message => {
                Response.setDescription(`Bot cleared \`${message.size}\` messages :broom:`)
                interaction.reply({embeds: [Response]}).then(() => {
                    setTimeout(function () {
                        interaction.deleteReply();
                    }, 2500);
                  });
            })
        }
    }
}
