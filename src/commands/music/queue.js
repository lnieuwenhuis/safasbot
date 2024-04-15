const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("queue")
		.setDescription("Shows the first 10 songs in the queue"),

	async execute(interaction, client) {
		let queue;

		if (!client.queueManager.get(interaction.guild)) {
			queue = client.queueManager.create(interaction.guild);
		} else {
			queue = client.queueManager.get(interaction.guild);
		}

		if (!queue || !queue.isPlaying()) {
			await interaction.reply("There is no song playing.");
			return;
		}

		const queueString = queue.tracks
			.slice(0, 10)
			.map((song, i) => {
				return `${i + 1}) [${song.duration}]\` ${song.title} - <@${
					song.requestedBy.id
				}>`;
			})
			.join("\n");

		const currentSong = queue.current;

		let embed = new EmbedBuilder()
			.setDescription(
				`**Currently Playing:**\n\` ${currentSong.title} - <@${currentSong.requestedBy.id}>`
			)
			.setThumbnail(currentSong.thumbnail);
	},
};
