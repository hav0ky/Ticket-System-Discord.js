const Discord = require("discord.js");
const config = require("./config/config.json");
const intents = new Discord.Intents(32767);
const client = new Discord.Client({intents});
const discordTranscripts = require('discord-html-transcripts');

const { MessageEmbed, MessageActionRow, MessageButton, Collection } = require('discord.js');

client.on('interactionCreate', async (interaction) => {
    if (interaction.isButton()) {
        if(interaction.customId === 'create') {
            const dembed = new MessageEmbed()
	            .setColor('#000000')
	            .setDescription('You already have a ticket open!')
	            .setTimestamp()
            if(interaction.guild.channels.cache.find(ch => ch.name === interaction.member.id)){
                await interaction.reply({ embeds: [dembed], ephemeral: true });
            } else {
                interaction.guild.channels.create(`${interaction.member.id}`, {
                    type : 'text',
                    parent : config.parentCategory,
                    permissionOverwrites : [
                        {
                            id : interaction.guild.roles.everyone,
                            deny : ['VIEW_CHANNEL']
                        },
                        {
                            id : interaction.member.id,
                            allow : ['VIEW_CHANNEL', 'SEND_MESSAGES', 'ADD_REACTIONS', 'EMBED_LINKS', 'ATTACH_FILES', 'READ_MESSAGE_HISTORY']
                        }
                    ]
                }).then(async channel=> {
                    const cembed = new MessageEmbed()
                    .setColor('#000000')
                    .setDescription(`Ticket created <#${channel.id}>`)
                    .setTimestamp()
                    await interaction.reply({ embeds: [cembed], ephemeral: true });
                    const exampleEmbed = new MessageEmbed()
                        .setColor('#007dd6')
                        .setDescription('Support will be with you shortly.\nTo close this ticket react with 🔒')
                        .setTimestamp()
                    const disbut = new MessageActionRow().addComponents(
                        new MessageButton()
                            .setCustomId('delete')
                            .setLabel('Close')
                            .setStyle('SECONDARY')
                            .setDisabled(false)
                    );
                    channel.send({ content: `<@${interaction.member.id}> Welcome!`, embeds: [exampleEmbed] , components: [disbut]});
                })
            }
        }
    }
});

client.on('interactionCreate', async (interaction) => {
    if (interaction.isButton()) {
        if(interaction.customId === 'delete') {
            if (interaction.member.roles.cache.some(role => role.name === config.roleName)){
                const iembed = new MessageEmbed()
	            .setColor('#000000')
	            .setDescription('Are you sure you would like to close the ticket?')
                const clbut = new MessageActionRow().addComponents(
                new MessageButton()
                    .setCustomId('close')
                    .setLabel('Close')
                    .setStyle('DANGER')
                    .setDisabled(false),
                new MessageButton()
                    .setCustomId('cancel')
                    .setLabel('Cancel')
                    .setStyle('SECONDARY')
                    .setDisabled(false)
                );
                interaction.reply({embeds: [iembed] , components: [clbut]})
            } else {
                const oembed = new MessageEmbed()
	            .setColor('#000000')
	            .setDescription('You donot have access to close the ticket!')
                await interaction.reply({ embeds: [oembed], ephemeral: true });
            }
        } else if (interaction.customId === 'close') {
            const cembed = new MessageEmbed()
	            .setColor('#000000')
	            .setDescription('Ticket will be deleted in a few seconds')
            interaction.channel.send({ embeds: [cembed]});
            const channel = interaction.channel;
            const attachment = await discordTranscripts.createTranscript(channel);
            const fetchMessages = await interaction.channel.messages.fetch({ after: 1, limit: 1 });
            const msg = fetchMessages.first();
            let memberx = msg.mentions.members.first().id
            const xEmbed = new MessageEmbed()
                .setColor('#000000')
                .setTitle('Ticket closed')
                .setDescription('')
                .addFields(
                    { name: 'Ticket ID', value: `${interaction.channel.id}`},
                    { name: 'Created by', value: `<@${memberx}>`, inline: true },
                    { name: 'Closed by', value: `<@${interaction.member.id}>`, inline: true },
                )
                .setTimestamp()
            client.channels.cache.get(config.channelId).send({ embeds: [xEmbed] });
            client.channels.cache.get(config.channelId).send({ files: [attachment] });
            setTimeout(() => interaction.channel.delete(), 2000);
        } else if (interaction.customId === 'cancel') {
            setTimeout(() => interaction.message.delete(), 2000);
        }
    }
});

client.commands = new Collection();

require("./handlers/events")(client);
require("./handlers/commands")(client);

client.login(config.token);