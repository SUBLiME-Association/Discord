const { MessageEmbed, Message, WebhookClient } = require("discord.js");
const Config = require("../../Structures/config.json");
const fs = require('fs');
let reponseList = fs.readFileSync("Structures/config.json");


const ballreponsehello = JSON.parse(reponseList).random_bonjour;
const ballreponsecava = JSON.parse(reponseList).random_cava; 
const ballreponsetext = JSON.parse(reponseList).random_strings; 



let string_1 = "bonjour wesh salut salem slt cc salut bjr coucou hello yo"
let string_2 = "ca va ? comment tu va ? tu va bien ? bien ?"



function GetRandomReponse(message) {
    if (string_1.indexOf(message.content.toLowerCase().trim()) !== -1) {
        return ballreponsehello[Math.floor(Math.random() * ballreponsehello.length)];
    } else if (string_2.indexOf(message.content.toLowerCase().trim()) !== -1) {
        return ballreponsecava[Math.floor(Math.random() * ballreponsecava.length)];
    }
    return ballreponsetext[Math.floor(Math.random() * ballreponsetext.length)];
}



module.exports = {
    name: "messageCreate",
    async execute(message) {
        if (message.author.bot) return;
        if (message.channel.id === Config["8ball_channel"]){
            message.reply(GetRandomReponse(message))
        }
    }
}