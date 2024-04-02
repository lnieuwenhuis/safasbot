const { ActivityType } = require("discord.js");

module.exports = {
	name: "ready",
	once: true,
	async execute(client) {
		client.user.setActivity({
			type: ActivityType.Custom,
			name: "customstatus",
			state: "github.com/lnieuwenhuis/discordbotjs",
		});

		console.log(`Ready, ${client.user.tag} is logged in and online!`);
	},
};
