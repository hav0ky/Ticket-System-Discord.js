const { readdirSync } = require("fs");
const { Client } = require("discord.js");

/**
 * 
 * @param {Client} client 
 */

module.exports = async(client) => {
    readdirSync("./commands/").forEach((dir) => {
        const commandFiles = readdirSync(`./commands/`).filter((files) => files.endsWith(".js"));

        for (const file of commandFiles) {
            const command = require(`../commands/${file}`);
            if (!command.name) throw new Error("Please provide a command name.");
            if (!command.description) throw new Error("Please provide a command description.")
            client.commands.set(command.name, command);
        }
    });

    client.on("ready", () => {
        console.log(`Total Commands Loaded: ${client.commands.size}`);
    });
}