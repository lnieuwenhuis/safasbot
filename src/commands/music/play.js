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
		.addSubcommand((subcommand) => {
			subcommand
				.setName("search")
				.setDescription("Searches for a song")
				.addStringOption((option) => {
					option
						.setName("searchterms")
						.setDescription("Search Keywords")
						.setRequired(true);
				});
		})
		.addSubcommand((subcommand) => {
			subcommand
				.setName("playlist")
				.setDescription("Plays playlist from YT")
				.addStringOption((option) => {
					option
						.setName("url")
						.setDescription("playlist url")
						.setRequired(true);
				});
		})
		.addSubcommand((subcommand) => {
			subcommand
				.setName("song")
				.setDescription("Plays a song from YT")
				.addStringOption((option) => {
					option
						.setName("url")
						.setDescription("song url")
						.setRequired(true);
				});
		}),
	async execute(interaction, client) {},
};
