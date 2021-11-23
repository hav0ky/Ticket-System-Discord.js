const discord = require("discord.js");
const { MessageEmbed } = require('discord.js');
const config = require("./../config/config.json");

module.exports = {
    name: "add",
    description: "Adds a member to the ticket.",
    usage: `.add <user>`,

    execute: async(client, message, args) => {
        if(message.member.roles.cache.some(role => role.name === config.roleName)){
            const dembed = new MessageEmbed()
                .setColor('#000000')
                .setDescription('Not in a ticket channel')
            if (message.channel.parent != config.parentCategory) return message.channel.send({ embeds: [dembed] })

            let user = message.mentions.members.first() || message.guild.members.cache.get(args[0])
            const cembed = new MessageEmbed()
                .setColor('#000000')
                .setDescription('Cannot add that member')
            if (!user) return message.channel.send({ embeds: [cembed] });
            async function addMemberToTicket() {
                message.channel.permissionOverwrites.edit(user, { VIEW_CHANNEL: true, SEND_MESSAGES: true , ADD_REACTIONS: true, EMBED_LINKS: true, ATTACH_FILES: true, READ_MESSAGE_HISTORY: true });
                const aembed = new MessageEmbed()
                .setColor('#000000')
                .setDescription(`Added <@${user.id}>`)
                message.channel.send({ embeds: [aembed] })
            }
            addMemberToTicket();
        }
    }
}