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
		const bezwaar = interaction.options.getString(`bezwaar`);
		const clipurl = interaction.options.getString(`clipurl`);

		const fiaRole = "775805566224039957";
		const raceDirector = "919694933261185045";

		let reportMessage = await interaction.channel.messages.fetch({
			limit: 1,
			cache: false,
		});

		let reportEmbed = reportMessage.toJSON()[0].embeds[0].data.description;

		let reportData = reportEmbed.split("*");
		let reportingUser = reportData[1];
		let reportMentioned = reportMessage.toJSON()[0].mentions.users.toJSON();

		let placeholder = reportingUser.split("@");
		let reportingUserSnowFlake = placeholder[1].split(">")[0];

		let reporter = await interaction.guild.members.fetch(
			reportingUserSnowFlake
		);
		let continueVar;

		await reportMentioned.forEach((user) => {
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
				`**Bezwaar van: ${interaction.member}**\n**Op report van: ${reportingUser}**\n\nBezwaar: ${bezwaar}\nClip: ${clipurl}`
			)
			.setColor("Red");

		await interaction.editReply({
			embeds: [embed],
			content: `<@&${fiaRole}> <@&${raceDirector}>`,
			ephemeral: false,
		});
	},
};
