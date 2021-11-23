const { Client, Message, MessageEmbed } = require("discord.js");
const config = require("./../config/config.json")

/**
 * 
 * @param {Client} client 
 * @param {Message} message 
 */

module.exports = async(client, message) => {
    const prefix = config.prefix;

    if (!message.guild || message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();
    const command = client.commands.get(commandName) || client.commands.find((x) => x.aliases && x.aliases.includes(commandName));
    if (!command) return;
    
    try {
        command.execute(client, message, args, prefix);
    } catch (error) {
        console.error(error);
        await message.channel.send({
            content: "An unexpected error occured!"
        });
    }
}