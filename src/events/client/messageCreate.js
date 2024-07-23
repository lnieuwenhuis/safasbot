const { Client, Message } = require("discord.js");
const giveUserXP = require("../../functions/core/giveUserXP");

/**
 *  
 * @param {Message} message
 * @param {Client} client
 */

function getRandomXp(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}

module.exports = {
	name: "messageCreate",
	async execute(message, client) {
        await giveUserXP(message);
    }
};
