const {
	SlashCommandBuilder,
	EmbedBuilder,
	ActionRowBuilder,
	ButtonBuilder,
	ButtonStyle,
	RoleManager,
} = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName(`protest`)
		.setDescription(`Maak bezwaar tegen een report`)
		.addMentionableOption((option) =>
			option
				.setName("reporter")
				.setDescription(`De persoon die het report heeft ingedient`)
				.setRequired(true)
		)
		.addStringOption((option) =>
			option
				.setName(`bezwaar`)
				.setDescription(`Geen je argumenten voor je bezwaar`)
				.setRequired(true)
		)
		.addStringOption((option) =>
			option
				.setName("clipurl")
				.setDescription(`Geef de URL van de clip van het incident`)
				.setRequired(true)
		),

	async execute(interaction, client) {
		const reporter = interaction.options.getMentionable(`reporter`);
		const bezwaar = interaction.options.getString(`bezwaar`);
		const clipurl = interaction.options.getString(`clipurl`);

		const fiaRole = "775805566224039957";
		const raceDirector = "919694933261185045";

		let reportMessage = await interaction.channel.messages.fetch({
			limit: 1,
			cache: false,
		});

		return console.log(
			reportMessage.toJSON()[0].mentions.users.toJSON()[0]
		);

		let embed = new EmbedBuilder()
			.setDescription(
				`**Bezwaar van: ${interaction.member}**\n**Op report van: ${reporter}**\n\nBezwaar: ${bezwaar}\nClip: ${clipurl}`
			)
			.setColor("Red");

		await interaction.reply({
			embeds: [embed],
			content: `<@&${fiaRole}> <@&${raceDirector}>`,
		});
	},
};
