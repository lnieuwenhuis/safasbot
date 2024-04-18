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
		await interaction.deferReply({
			ephemeral: true,
		});
		const reporter = interaction.options.getMentionable(`reporter`);
		const bezwaar = interaction.options.getString(`bezwaar`);
		const clipurl = interaction.options.getString(`clipurl`);

		const fiaRole = "775805566224039957";
		const raceDirector = "919694933261185045";

		let reportMessage = await interaction.channel.messages.fetch({
			limit: 1,
			cache: false,
		});

		let reportMentioned = reportMessage.toJSON()[0].mentions.users.toJSON();

		let continueVar;

		reportMentioned.forEach((user) => {
			if (
				interaction.member.id != user.id ||
				reporter.user.id != user.id
			) {
				continueVar = false;
				return interaction.editReply({
					content: `Jij bent niet betrokken bij dit incident!`,
					ephemeral: true,
				});
			} else {
				continueVar = true;
			}
		});

		if (continueVar == false) {
			return;
		}

		let embed = new EmbedBuilder()
			.setDescription(
				`**Bezwaar van: ${interaction.member}**\n**Op report van: ${reporter}**\n\nBezwaar: ${bezwaar}\nClip: ${clipurl}`
			)
			.setColor("Red");

		await interaction.editReply({
			embeds: [embed],
			content: `<@&${fiaRole}> <@&${raceDirector}>`,
			ephemeral: false,
		});
	},
};
