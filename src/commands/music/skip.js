const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("skip")
		.setDescription("Skips the current song"),

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

		queue.skip();

		let embed = new EmbedBuilder()
			.setDescription(`Skipped **${currentSong.title}**`)
			.setThumbnail(currentSong.thumbnail);

		await interaction.reply({ embeds: embed });
	},
};
