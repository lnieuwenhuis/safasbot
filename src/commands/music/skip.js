const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("skip")
		.setDescription("Skips the current song"),

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

		queue.skip();

		let embed = new EmbedBuilder()
			.setDescription(`Skipped **${currentSong.title}**`)
			.setThumbnail(currentSong.thumbnail);

		await interaction.reply({ embeds: embed });
	},
};
