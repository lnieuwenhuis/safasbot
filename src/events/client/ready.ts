const { REST, Routes, ActivityType } = require("discord.js");

module.exports = {
	name: "ready",
	once: true,
	async execute(client: any) {
		client.user.setActivity({
			type: ActivityType.Custom,
			name: "customstatus",
			state: "github.com/lnieuwenhuis",
		});

		console.log(`Ready, ${client.user.tag} is logged in and online!`);
		console.log(`Bot is in ${client.guilds.cache.size} servers`);
	},
};