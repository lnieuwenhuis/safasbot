const {
	SlashCommandBuilder,
	EmbedBuilder,
	ActionRowBuilder,
	ButtonBuilder,
	ButtonStyle,
	PermissionsBitField,
	PermissionFlagsBits,
} = require("discord.js");

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
				.addChannelOption((option) =>
					option
						.setName("url")
						.setDescription("Song URL")
						.setRequired(true)
				)
		),
	async execute(interaction, client) {},
};
