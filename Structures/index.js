const {Client, Collection} = require("discord.js");
const Config = require("./config.json");
const client = new Client({intents: 32767})
const { promisify } = require("util");
const { glob } = require("glob")
const PG = promisify(glob);
const Ascii = require("ascii-table");


client.commands = new Collection();

["Events", "Commands"].forEach(handler => {
    require(`./Handlers/${handler}`)(client, PG, Ascii)
})

client.login(Config.token)