const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("exit")
		.setDescription("Stops queue and exits voice channel"),

	async execute(interaction, client) {
		let queue;

		if (!client.queueManager.get(interaction.guild)) {
			queue = client.queueManager.create(interaction.guild);
		} else {
			queue = client.queueManager.get(interaction.guild);
		}
		if (!queue) {
			await interaction.reply({
				content: "There is no song playing!",
				ephemeral: true,
			});
			return;
		}

		const currentSong = queue.current;

		queue.delete(interaction.guildId);

		await interaction.reply({ content: "**Roblox death noise**" });
	},
};
