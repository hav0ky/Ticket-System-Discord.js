const { Client } = require("discord.js");
const config = require("./../config/config.json")

/**
 * 
 * @param {Client} client 
 */

module.exports = async(client, message) => {
    client.user.setPresence({
        activities: [{ 
          name: `prefix [${config.prefix}] | Ticket System`,
          type: "WATCHING"
        }],
        status: "dnd"
    })
    console.log(`Logged in as ${client.user.username}`)
}