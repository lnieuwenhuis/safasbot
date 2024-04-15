const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("queue")
		.setDescription("Shows the first 10 songs in the queue"),

	async execute(interaction, client) {
		let queue = client.queueManager.get(interaction.guild);

		if (!queue) return interaction.reply({ content: `There is no queue` });

		if (!queue.isPlaying()) {
			await interaction.reply("There is no song playing.");
			return;
		}

		const queueString = queue.tracks
			.toArray()
			.slice(0, 10)
			.map((song, i) => {
				return `${i + 1}) [${song.duration}]\` ${song.title} - <@${
					song.requestedBy.id
				}>`;
			})
			.join("\n");

		const currentSong = queue.currentTrack;

		let embed = new EmbedBuilder()
			.setDescription(
				`**Currently Playing**\n` +
					(currentSong
						? `\`[${currentSong.duration}]\` ${currentSong.title} - <@${currentSong.requestedBy.id}>`
						: "None") +
					`\n\n**Queue**\n${queueString}`
			)
			.setThumbnail(currentSong.thumbnail);

		await interaction.reply({ embeds: [embed] });
	},
};
