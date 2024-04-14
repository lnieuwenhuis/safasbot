const { SlashCommandBuilder } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName(`test`)
		.setDescription(`test if this command works`),

	async execute(interaction, client) {
		const queue = client.queue;

		try {
			interaction.reply({
				content: `This works somehow`,
				ephemeral: true,
			});
			console.log(queue.currentTrack);
		} catch (error) {
			console.error(error);
		}
	},
};
