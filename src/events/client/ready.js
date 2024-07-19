const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const { ActivityType } = require("discord.js");

module.exports = {
	name: "ready",
	once: true,
	async execute(client) {
		client.user.setActivity({
			type: ActivityType.Custom,
			name: "customstatus",
			state: "github.com/lnieuwenhuis",
		});

		console.log(`Ready, ${client.user.tag} is logged in and online!`);
		console.log(`Bot is in ${client.guilds.cache.size} servers`);
	},
};
