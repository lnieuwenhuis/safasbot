const { QueryType, GuildQueue, GuildNodeManager } = require("discord-player");
const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("play")
		.setDescription("Plays a Song")
		.addSubcommand((subcommand) =>
			subcommand
				.setName("search")
				.setDescription("Search for a song to play")
				.addStringOption((option) =>
					option
						.setName("searchterms")
						.setDescription("Search Keywords")
						.setRequired(true)
				)
		)
		.addSubcommand((subcommand) =>
			subcommand
				.setName("playlist")
				.setDescription("Plays a Playlist from YouTube")
				.addStringOption((option) =>
					option
						.setName("url")
						.setDescription("Playlist URL")
						.setRequired(true)
				)
		)
		.addSubcommand((subcommand) =>
			subcommand
				.setName("song")
				.setDescription("Plays a song from YouTube")
				.addStringOption((option) =>
					option
						.setName("url")
						.setDescription("Song URL")
						.setRequired(true)
				)
		),
	async execute(interaction, client) {
		if (!interaction.member.voice.channel) {
			await interaction.reply({
				content: "You must be in a voice channel to use this Command",
				ephemeral: true,
			});
			return;
		}

		let embed;

		let queue;

		if (!client.queueManager.get(interaction.guild)) {
			queue = client.queueManager.create(interaction.guild);
		} else {
			queue = client.queueManager.get(interaction.guild);
		}

		if (!queue.connection)
			await queue.connect(interaction.member.voice.channel);

		if (interaction.options.getSubcommand() === "song") {
			let url = interaction.options.getString("url");

			const result = await client.player.search(url, {
				requestedBy: interaction.user,
				searchEngine: QueryType.YOUTUBE_VIDEO,
			});

			if (result.tracks.length === 0) {
				await interaction.reply({
					content: "No Results Found",
					ephemeral: true,
				});
				return;
			}

			const song = result.tracks[0];

			if (!queue.isPlaying()) queue.play(song);
			else queue.addTrack(song);

			embed = new EmbedBuilder()
				.setDescription(
					`Added **[${song.title}](${song.url})** to the queue...`
				)
				.setThumbnail(song.thumbnail)
				.setFooter({ text: `Duration: ${song.duration}` });
		} else if (interaction.options.getSubcommand() === "playlist") {
			let url = interaction.options.getString("url");

			const result = await client.player.search(url, {
				requestedBy: interaction.user,
				searchEngine: QueryType.YOUTUBE_PLAYLIST,
			});

			if (result.tracks.length === 0) {
				await interaction.reply({
					content: "No Playlist Found",
					ephemeral: true,
				});
				return;
			}

			const playlist = result.playlist;
			if (!queue.isPlaying()) queue.play(playlist[0]);
			else queue.addTrack(playlist);

			embed = new EmbedBuilder()
				.setDescription(
					`Added **[${playlist.title}](${playlist.url})** to the queue...`
				)
				.setThumbnail(playlist.thumbnail)
				.setFooter({ text: `Duration: ${playlist.duration}` });
		} else if (interaction.options.getSubcommand() === "search") {
			let url = interaction.options.getString("searchterms");

			const result = await client.player.search(url, {
				requestedBy: interaction.user,
				searchEngine: QueryType.AUTO,
			});

			if (result.tracks.length === 0) {
				await interaction.reply({
					content: "No Results Found",
					ephemeral: true,
				});
				return;
			}

			const song = result.tracks[0];
			if (!queue.isPlaying()) queue.play(song);
			else queue.addTrack(song);

			embed = new EmbedBuilder()
				.setDescription(
					`Added **[${song.title}](${song.url})** to the queue...`
				)
				.setThumbnail(song.thumbnail)
				.setFooter({ text: `Duration: ${song.duration}` });
		}

		return interaction.reply({ embeds: [embed] });
	},
};
