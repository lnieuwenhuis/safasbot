const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("exit")
		.setDescription("Stops queue and exits voice channel"),

	async execute(interaction, client) {
		const queue = client.queue;

		if (!queue) {
			await interaction.reply({
				content: "There is no song playing!",
				ephemeral: true,
			});
			return;
		}

		const currentSong = queue.current;

		queue.delete(interaction.guild.id);

		await interaction.reply({ content: "**Roblox death noise**" });
	},
};
