const discord = require("discord.js");
const { MessageEmbed, MessageActionRow, MessageButton} = require('discord.js');
const config = require("../config/config.json");

module.exports = {
    name: "ticketpanel",
    description: "Sends ticket panel embed",
    usage: `.ticketpanel`,

    execute: async(client, message, args) => {
        if (message.author.id === config.authorId) {
            const exampleEmbed = new MessageEmbed()
            .setColor('#000000')
            .setTitle('Support ticket')
            .setDescription('To create a ticket react with xD')
            .setFooter('IndianHvH.club', 'https://i.imgur.com/AfFp7pu.png');
    
            const row = new MessageActionRow().addComponents(
                new MessageButton()
                    .setCustomId('create')
                    .setLabel('Create Ticket')
                    .setStyle('PRIMARY')
                    .setDisabled(false)
            );
            message.channel.send({ embeds: [exampleEmbed], components: [row]});
        }
    }
}