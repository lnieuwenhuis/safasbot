const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("resume")
		.setDescription("Resumes the current song"),

	async execute(interaction, client) {
		const queue = client.player.getQueue(interaction.guild);

		if (!queue) {
			await interaction.reply({
				content: "There is no song playing!",
				ephemeral: true,
			});
			return;
		}

		const currentSong = queue.current;

		queue.setPaused(false);

		let embed = new EmbedBuilder()
			.setDescription(`Resumed **${currentSong.title}**`)
			.setThumbnail(currentSong.thumbnail);

		await interaction.reply({ embeds: embed });
	},
};
