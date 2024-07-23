const { Client, Message } = require("discord.js");
const giveUserXP = require("../../functions/core/giveUserXP");

/**
 *  
 * @param {Message} message
 * @param {Client} client
 */

module.exports = {
	name: "messageCreate",
	async execute(message, client) {
        // Give the user XP for writing a message
        await giveUserXP(message);
    }
};
