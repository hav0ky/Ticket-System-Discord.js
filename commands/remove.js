const discord = require("discord.js");
const { MessageEmbed } = require('discord.js');
const config = require("./../config/config.json");

module.exports = {
    name: "remove",
    description: "Removes member from the ticket.",
    usage: ".remove <user>",

    execute: async(client, message, args) => {
        if(message.member.roles.cache.some(role => role.name === config.roleName)){
            const dembed = new MessageEmbed()
                .setColor('#000000')
                .setDescription('Not in a ticket channel')
            if (message.channel.parent != config.parentCategory) return message.channel.send({ embeds: [dembed] })

            let user = message.mentions.members.first() || message.guild.members.cache.get(args[0])
            const gembed = new MessageEmbed()
                .setColor('#000000')
                .setDescription('Cannot remove that member')
            if (!user) return message.channel.send({ embeds: [gembed] });

            async function removeUserFromTicket() {
                message.channel.permissionOverwrites.edit(user, { VIEW_CHANNEL: false, SEND_MESSAGES: false , ADD_REACTIONS: false, EMBED_LINKS: false, ATTACH_FILES: false, READ_MESSAGE_HISTORY: false });
                const fembed = new MessageEmbed()
                .setColor('#000000')
                .setDescription(`Removed <@${user.id}>`)
                message.channel.send({ embeds: [fembed] })
            }
            removeUserFromTicket();
        }
    }
}